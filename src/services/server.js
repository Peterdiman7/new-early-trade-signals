import path from "path"
import express from "express"
import mysql from "mysql2/promise"
import cors from "cors"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import cron from "node-cron"

dotenv.config({ path: path.resolve("/home/devalex/early-trade-signals.com/early-trade-signals/.env") })

const app = express()

// ---- CORS configuration ----
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true)

        const allowedOrigins = [
            "early-trade-signals.com",
            "www.early-trade-signals.com",
            "https://early-trade-signals.com",
            "https://www.early-trade-signals.com",
            "https://ku.early-trade-signals.com",
            "https://ksa.early-trade-signals.com",
            "https://iq.early-trade-signals.com",
            "https://su.early-trade-signals.com",
            "https://de.early-trade-signals.com",
            "http://localhost:9004",
            "http://localhost:5173",
        ]

        if (allowedOrigins.includes(origin)) {
            return callback(null, true)
        }

        callback(new Error("Not allowed by CORS: " + origin))
    },
    credentials: true,
    optionsSuccessStatus: 204
}))

app.use(express.json())
app.use(cookieParser())

// ---- MYSQL POOL ----
const pool = mysql.createPool({
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER,
    port: Number(process.env.DB_PORT) || 3306,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

// ---- JWT SECRET ----
const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
    console.error("Missing JWT_SECRET in .env")
    process.exit(1)
}

const ALPHA_VANTAGE_KEY = process.env.ALPHA_VANTAGE_KEY

// Stock symbols
const STOCK_SYMBOLS = [
    "AAPL", "MSFT", "TSLA", "GOOGL", "AMZN", "NVDA", "META", "JPM", "V", "BAC",
    "NFLX", "ADBE", "PYPL", "INTC", "CSCO", "ORCL", "IBM", "CRM", "QCOM", "AVGO",
    "TXN", "AMD", "SAP", "BABA", "UBER", "LYFT", "SNAP", "SQ", "SHOP",
    "SPOT", "ROKU", "DOCU", "ZM", "PINS", "BIDU", "BA", "GE", "F",
    "GM", "KO", "PEP", "MCD", "SBUX", "DIS", "NKE", "LULU", "WMT", "TGT",
    "CVS", "COST", "HD", "LOW", "UNH", "JNJ", "PFE", "MRK", "ABBV", "AMGN"
]

// Commodity symbols with their Alpha Vantage function names
const COMMODITIES = [
    { symbol: "GOLD", name: "Gold", function: "WTI" }, // Using WTI as proxy
    { symbol: "SILVER", name: "Silver", function: "BRENT" },
    { symbol: "CRUDE_OIL", name: "Crude Oil (WTI)", function: "WTI" },
    { symbol: "BRENT_OIL", name: "Brent Oil", function: "BRENT" },
    { symbol: "NATURAL_GAS", name: "Natural Gas", function: "NATURAL_GAS" },
    { symbol: "COPPER", name: "Copper", function: "COPPER" },
    { symbol: "WHEAT", name: "Wheat", function: "WHEAT" },
    { symbol: "CORN", name: "Corn", function: "CORN" },
    { symbol: "COFFEE", name: "Coffee", function: "COFFEE" },
    { symbol: "SUGAR", name: "Sugar", function: "SUGAR" }
]

// Helper to safely parse numbers
function toNum(v, fallback = 0) {
    const n = parseFloat(v)
    return Number.isFinite(n) ? n : fallback
}

// Fetch stock signal from Alpha Vantage
async function fetchStockSignal(symbol) {
    try {
        const response = await fetch(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_KEY}`
        )

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        if (data.Note || data['Error Message']) {
            console.log(`API limit or error for ${symbol}`)
            return null
        }

        const quote = data['Global Quote']
        if (!quote || Object.keys(quote).length === 0) {
            return null
        }

        const price = toNum(quote['05. price'])
        const changePercent = toNum((quote['10. change percent'] || '').replace('%', ''))
        const high = toNum(quote['03. high'], price)
        const low = toNum(quote['04. low'], price)

        const priceRange = high !== low ? ((price - low) / (high - low)) * 100 : 50

        let recommendation = 'Hold'

        if (changePercent > 3 && priceRange > 70) {
            recommendation = 'Buy'
        } else if (changePercent > 1.5) {
            recommendation = 'Buy'
        } else if (changePercent < -3) {
            recommendation = 'Sell'
        } else if (changePercent < 0 && priceRange < 30) {
            recommendation = 'Sell'
        }

        return {
            symbol,
            recommendation,
            price: price.toFixed(2),
            type: 'stock'
        }
    } catch (err) {
        console.error(`Error fetching stock ${symbol}:`, err.message)
        return null
    }
}

// Fetch commodity signal from Alpha Vantage
async function fetchCommoditySignal(commodity) {
    try {
        const response = await fetch(
            `https://www.alphavantage.co/query?function=${commodity.function}&interval=monthly&apikey=${ALPHA_VANTAGE_KEY}`
        )

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        if (data.Note || data['Error Message']) {
            console.log(`API limit or error for ${commodity.symbol}`)
            return null
        }

        // Get the data series
        const dataKey = Object.keys(data).find(key => key.includes('data'))
        if (!dataKey || !data[dataKey] || data[dataKey].length < 2) {
            return null
        }

        const recentData = data[dataKey].slice(0, 2)
        const current = toNum(recentData[0].value)
        const previous = toNum(recentData[1].value)

        if (current === 0 || previous === 0) {
            return null
        }

        const changePercent = ((current - previous) / previous) * 100

        let recommendation = 'Hold'

        if (changePercent > 5) {
            recommendation = 'Buy'
        } else if (changePercent > 2) {
            recommendation = 'Buy'
        } else if (changePercent < -5) {
            recommendation = 'Sell'
        } else if (changePercent < -2) {
            recommendation = 'Sell'
        }

        return {
            symbol: commodity.symbol,
            recommendation,
            price: current.toFixed(2),
            type: 'commodity',
            name: commodity.name
        }
    } catch (err) {
        console.error(`Error fetching commodity ${commodity.symbol}:`, err.message)
        return null
    }
}

// Save signal to database
async function saveSignalToDB(signal) {
    if (!signal) return

    try {
        await pool.execute(
            `INSERT INTO signals (symbol, recommendation, price, type, updated_at)
             VALUES (?, ?, ?, ?, NOW())
             ON DUPLICATE KEY UPDATE
                recommendation = VALUES(recommendation),
                price = VALUES(price),
                type = VALUES(type),
                updated_at = NOW()`,
            [signal.symbol, signal.recommendation, signal.price, signal.type || 'stock']
        )
    } catch (err) {
        console.error(`Error saving ${signal.symbol} to DB:`, err.message)
    }
}

// Update all signals (batch processing with rate limiting)
async function updateAllSignals() {
    console.log("🔄 Starting signal update...")

    const batchSize = 5
    const delayBetweenBatches = 12000 // 12 seconds

    // Process stocks
    for (let i = 0; i < STOCK_SYMBOLS.length; i += batchSize) {
        const batch = STOCK_SYMBOLS.slice(i, i + batchSize)
        console.log(`Processing stock batch: ${batch.join(', ')}`)

        const results = await Promise.all(
            batch.map(symbol => fetchStockSignal(symbol))
        )

        for (const signal of results) {
            if (signal) {
                await saveSignalToDB(signal)
            }
        }

        if (i + batchSize < STOCK_SYMBOLS.length) {
            console.log(`⏱️  Waiting ${delayBetweenBatches / 1000}s before next batch...`)
            await new Promise(resolve => setTimeout(resolve, delayBetweenBatches))
        }
    }

    // Wait before processing commodities
    await new Promise(resolve => setTimeout(resolve, delayBetweenBatches))

    // Process commodities
    for (let i = 0; i < COMMODITIES.length; i += batchSize) {
        const batch = COMMODITIES.slice(i, i + batchSize)
        console.log(`Processing commodity batch: ${batch.map(c => c.name).join(', ')}`)

        const results = await Promise.all(
            batch.map(commodity => fetchCommoditySignal(commodity))
        )

        for (const signal of results) {
            if (signal) {
                await saveSignalToDB(signal)
            }
        }

        if (i + batchSize < COMMODITIES.length) {
            console.log(`⏱️  Waiting ${delayBetweenBatches / 1000}s before next batch...`)
            await new Promise(resolve => setTimeout(resolve, delayBetweenBatches))
        }
    }

    console.log("✅ Signal update completed")
}

// Run cron job every minute
cron.schedule("* * * * *", () => {
    console.log(`[${new Date().toISOString()}] Running scheduled signal update`)
    updateAllSignals().catch(err => {
        console.error("Cron job error:", err)
    })
})

// Initial update on startup
console.log("🚀 Starting initial signal update...")
updateAllSignals().catch(err => {
    console.error("Initial update error:", err)
})

// ---- GET ALL SIGNALS ENDPOINT ----
app.get("/signals", async (req, res) => {
    try {
        const [rows] = await pool.execute(
            `SELECT symbol, recommendation, price, type, updated_at, img_url 
             FROM signals 
             ORDER BY 
                type DESC,
                CASE recommendation 
                    WHEN 'Buy' THEN 1 
                    WHEN 'Hold' THEN 2 
                    WHEN 'Sell' THEN 3 
                    ELSE 4 
                END,
                symbol ASC`
        )

        res.json({
            signals: rows,
            lastUpdated: rows.length > 0 ? rows[0].updated_at : null
        })
    } catch (err) {
        console.error("Error fetching signals:", err)
        res.status(500).json({ error: "Failed to fetch signals" })
    }
})

// ---- PROTECTED ROUTE ----
app.get("/auth/me", (req, res) => {
    const token = req.cookies.token
    if (!token) return res.status(401).json({ error: "Missing token" })

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        res.json(decoded)
    } catch (err) {
        res.status(401).json({ error: "Invalid or expired token" })
    }
})

// ---- REGISTER USER ----
app.post("/auth/register", async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields are required" })
    }

    try {
        const [existing] = await pool.execute(
            "SELECT id FROM users WHERE username = ? OR email = ?",
            [username, email]
        )

        if (existing.length > 0) {
            return res.status(409).json({ error: "Username or email already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await pool.execute(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            [username, email, hashedPassword]
        )

        res.json({ message: "Registration successful" })

    } catch (err) {
        console.error("REGISTER ERROR:", err)
        res.status(500).json({ error: "Database error" })
    }
})

// ---- ACTIVATE 7-DAY SUBSCRIPTION ----
app.post("/subscription/activate", async (req, res) => {
    const token = req.cookies.token
    if (!token) return res.status(401).json({ error: "Missing token" })

    let user
    try {
        user = jwt.verify(token, JWT_SECRET)
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" })
    }

    try {
        // Update subscription in DB
        await pool.execute(
            `UPDATE users
             SET subscription_expires_at = DATE_ADD(NOW(), INTERVAL 7 DAY)
             WHERE id = ?`,
            [user.id]
        )

        // Fetch updated user data
        const [rows] = await pool.execute("SELECT id, username, email, subscription_expires_at FROM users WHERE id = ?", [user.id])
        const updatedUser = rows[0]

        // Re-issue JWT with updated subscription info
        const newToken = jwt.sign(
            {
                id: updatedUser.id,
                username: updatedUser.username,
                email: updatedUser.email,
                subscription_expires_at: updatedUser.subscription_expires_at
            },
            JWT_SECRET,
            { expiresIn: "2h" }
        )

        // Set new JWT cookie
        res.cookie("token", newToken, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 2 * 60 * 60 * 1000
        })

        // Return updated user info to frontend
        res.json(updatedUser)

    } catch (err) {
        console.error("SUBSCRIPTION ERROR:", err)
        res.status(500).json({ error: "Database error" })
    }
})


// ---- REGISTER USER FROM PAYMENT (NO PASSWORD) ----
app.post("/auth/register-from-payment", async (req, res) => {
    const { email, transactionId } = req.body

    if (!email || !transactionId) {
        return res.status(400).json({ error: "Missing required fields" })
    }

    try {
        // Check if user already exists
        const [existing] = await pool.execute(
            "SELECT id FROM users WHERE email = ?",
            [email]
        )

        if (existing.length > 0) {
            return res.status(409).json({ error: "User already exists" })
        }

        // Create user WITHOUT password, username = email
        await pool.execute(
            `INSERT INTO users (username, email, password, subscription_expires_at) 
             VALUES (?, ?, NULL, DATE_ADD(NOW(), INTERVAL 7 DAY))`,
            [email, email]
        )

        res.json({ message: "User created successfully" })

    } catch (err) {
        console.error("REGISTER FROM PAYMENT ERROR:", err)
        res.status(500).json({ error: "Database error" })
    }
})

// ---- UNIFIED LOGIN ENDPOINT ----
// Accepts both email and username, handles both regular login and password setup
app.post("/auth/login", async (req, res) => {
    const { email, username, password } = req.body

    // Use email if provided, otherwise fallback to username
    const loginIdentifier = email || username

    if (!loginIdentifier) {
        return res.status(400).json({ error: "Email or username is required" })
    }

    try {
        // Check if identifier is email or username
        const isEmail = loginIdentifier.includes('@')

        const query = isEmail
            ? "SELECT * FROM users WHERE email = ?"
            : "SELECT * FROM users WHERE username = ?"

        const [rows] = await pool.execute(query, [loginIdentifier])

        if (rows.length === 0) {
            return res.status(401).json({ error: "Invalid credentials" })
        }

        const user = rows[0]

        // If password is provided, verify it
        if (password) {
            // Check if user has no password (from payment)
            if (!user.password) {
                return res.status(401).json({ error: "Please set your password first" })
            }

            const match = await bcrypt.compare(password, user.password)

            if (!match) {
                return res.status(401).json({ error: "Invalid credentials" })
            }

            // Login successful - create JWT token
            const token = jwt.sign(
                {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    subscription_expires_at: user.subscription_expires_at
                },
                JWT_SECRET,
                { expiresIn: "2h" }
            )

            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 2 * 60 * 60 * 1000
            })

            return res.json({ message: "Login successful" })
        }

        // If no password provided, this is just an email check
        return res.status(400).json({ error: "Password is required" })

    } catch (err) {
        console.error("LOGIN ERROR:", err)
        res.status(500).json({ error: "Database error" })
    }
})

// ---- CHECK IF EMAIL EXISTS AND HAS PASSWORD ----
app.post("/auth/check-email", async (req, res) => {
    const { email } = req.body

    if (!email) {
        return res.status(400).json({ error: "Email is required" })
    }

    try {
        const [rows] = await pool.execute(
            "SELECT id, password FROM users WHERE email = ?",
            [email]
        )

        if (rows.length === 0) {
            return res.status(404).json({ error: "Email not found" })
        }

        const user = rows[0]
        const hasPassword = user.password !== null && user.password !== ''

        res.json({
            exists: true,
            hasPassword
        })

    } catch (err) {
        console.error("CHECK EMAIL ERROR:", err)
        res.status(500).json({ error: "Database error" })
    }
})

// ---- SET PASSWORD FOR USER WITHOUT PASSWORD ----
app.post("/auth/set-password", async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" })
    }

    if (password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters" })
    }

    try {
        // Check if user exists
        const [users] = await pool.execute(
            "SELECT id, password FROM users WHERE email = ?",
            [email]
        )

        if (users.length === 0) {
            return res.status(404).json({ error: "User not found" })
        }

        const user = users[0]

        // Check if user already has a password
        if (user.password !== null && user.password !== '') {
            return res.status(400).json({ error: "Password already set" })
        }

        // Hash and set password
        const hashedPassword = await bcrypt.hash(password, 10)

        await pool.execute(
            "UPDATE users SET password = ? WHERE id = ?",
            [hashedPassword, user.id]
        )

        // Get updated user data with subscription info
        const [updatedUsers] = await pool.execute(
            "SELECT id, username, email, subscription_expires_at FROM users WHERE id = ?",
            [user.id]
        )

        const updatedUser = updatedUsers[0]

        // Log user in automatically after setting password
        const token = jwt.sign(
            {
                id: updatedUser.id,
                username: updatedUser.username,
                email: updatedUser.email,
                subscription_expires_at: updatedUser.subscription_expires_at
            },
            JWT_SECRET,
            { expiresIn: "2h" }
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 2 * 60 * 60 * 1000
        })

        res.json({ message: "Password set successfully" })

    } catch (err) {
        console.error("SET PASSWORD ERROR:", err)
        res.status(500).json({ error: "Database error" })
    }
})

// ---- CANCEL SUBSCRIPTION ENDPOINT ----
app.post("/subscription/cancel", async (req, res) => {
    const { fullName, email, reason, comments } = req.body

    if (!fullName || !email || !reason) {
        return res.status(400).json({ error: "Missing required fields" })
    }

    try {
        // Send email to admin
        const adminMailOptions = {
            from: process.env.SMTP_USER,
            to: process.env.ADMIN_EMAIL || "info@early-trade-signals.com",
            subject: "Subscription Cancellation Request",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #ef4444;">Subscription Cancellation Request</h2>
                    <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>Name:</strong> ${fullName}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Reason:</strong> ${reason}</p>
                        ${comments ? `<p><strong>Comments:</strong> ${comments}</p>` : ''}
                    </div>
                    <p style="color: #6b7280; font-size: 14px;">
                        Received: ${new Date().toLocaleString()}
                    </p>
                </div>
            `
        }

        // Send confirmation email to user
        const userMailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: "We've Received Your Cancellation Request",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #22823A;">Cancellation Request Received</h2>
                    <p>Dear ${fullName},</p>
                    <p>We've received your request to cancel your subscription. We're sorry to see you go!</p>
                    <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>Request Details:</strong></p>
                        <p>Reason: ${reason}</p>
                        ${comments ? `<p>Your comments: ${comments}</p>` : ''}
                    </div>
                    <p>Our team will process your cancellation request within 24-48 hours. You will receive a confirmation email once your subscription has been cancelled.</p>
                    <p>If you have any questions or if this was a mistake, please contact us at <a href="mailto:info@early-trade-signals.com">info@early-trade-signals.com</a></p>
                    <p>Best regards,<br>Early Trade Signals Team</p>
                </div>
            `
        }

        // Send both emails
        await Promise.all([
            transporter.sendMail(adminMailOptions),
            transporter.sendMail(userMailOptions)
        ])

        res.json({
            success: true,
            message: "Your cancellation request has been submitted successfully"
        })

    } catch (err) {
        console.error("Email sending error:", err)
        res.status(500).json({
            error: "Failed to process cancellation request. Please try again later."
        })
    }
})

// ---- LOGOUT ----
app.post("/auth/logout", (req, res) => {
    res.clearCookie("token", { httpOnly: true, sameSite: "lax" })
    res.json({ message: "Logged out" })
})

// ---- START SERVER ----
app.listen(9104, () => {
    console.log("API running on http://localhost:9104")
    console.log("Signals endpoint: http://localhost:9104/signals")
})
