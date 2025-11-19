import path from "path"
import express from "express"
import mysql from "mysql2/promise"
import cors from "cors"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import axios from "axios"
import cron from "node-cron"

dotenv.config({ path: path.resolve("/home/devalex/early-trade-signals.com/early-trade-signals/.env") })

const app = express()

// ---- CORS configuration ----
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true)

        const allowedOrigins = [
            "https://early-trade-signals.com",
            "https://ku.early-trade-signals.com",
            "https://ksa.early-trade-signals.com",
            "https://iq.early-trade-signals.com",
            "https://su.early-trade-signals.com",
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

const SYMBOLS = [
    "AAPL","MSFT","TSLA","GOOGL","AMZN","NVDA","META","JPM","V","BAC",
    "NFLX","ADBE","PYPL","INTC","CSCO","ORCL","IBM","CRM","QCOM","AVGO",
    "TXN","AMD","SAP","BABA","UBER","LYFT","SNAP","SQ","SHOP",
    "SPOT","ROKU","DOCU","ZM","PINS","BIDU","BA","GE","F",
    "GM","KO","PEP","MCD","SBUX","DIS","NKE","LULU","WMT","TGT",
    "CVS","COST","HD","LOW","UNH","JNJ","PFE","MRK","ABBV","AMGN"
]

// Fetch one signal
async function fetchSignal(symbol) {
    try {
        const res = await axios.get("https://www.alphavantage.co/query", {
            params: {
                function: "TIME_SERIES_DAILY",
                symbol,
                apikey: process.env.ALPHA_VANTAGE_KEY
            }
        })

        const series = res.data["Time Series (Daily)"]
        if (!series) return null

        const latest = Object.keys(series)[0]
        const close = parseFloat(series[latest]["4. close"])

        const recommendation = close > 0 ? "Buy" : "Sell"

        return { symbol, recommendation, price: close }

    } catch (err) {
        console.error(`Error fetching ${symbol}:`, err.message)
        return null
    }
}

// Save to DB
async function saveSignalToDB(signal) {
    if (!signal) return

    await pool.execute(
        `INSERT INTO signals (symbol, recommendation, price, updated_at)
         VALUES (?, ?, ?, NOW())
         ON DUPLICATE KEY UPDATE
            recommendation = VALUES(recommendation),
            price = VALUES(price),
            updated_at = NOW()`,
        [signal.symbol, signal.recommendation, signal.price]
    )
}

// Fetch all signals
async function updateAllSignals() {
    console.log("Updating all signals...")

    for (const symbol of SYMBOLS) {
        const signal = await fetchSignal(symbol)
        await saveSignalToDB(signal)

        await new Promise(res => setTimeout(res, 1000)) // Avoid API rate limit
    }

    console.log("✔ All signals updated")
}

// Run every 15 minutes
cron.schedule("*/15 * * * *", () => {
    updateAllSignals()
})

// ---- LOGIN USER ----
app.post("/auth/login", async (req, res) => {
    const { username, password } = req.body

    try {
        const [rows] = await pool.execute(
            "SELECT * FROM users WHERE username = ?",
            [username]
        )

        if (rows.length === 0) {
            return res.status(401).json({ error: "Invalid credentials" })
        }

        const user = rows[0]
        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            return res.status(401).json({ error: "Invalid credentials" })
        }

        const token = jwt.sign(
            { id: user.id, username: user.username, email: user.email },
            JWT_SECRET,
            { expiresIn: "2h" }
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 2 * 60 * 60 * 1000
        })

        res.json({ message: "Login successful" })
    } catch (err) {
        console.error("LOGIN ERROR:", err)
        res.status(500).json({ error: "Database error" })
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
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Missing token" });

    let user;
    try {
        user = jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }

    try {
        await pool.execute(
            `UPDATE users
             SET subscription_expires_at = DATE_ADD(NOW(), INTERVAL 7 DAY)
             WHERE id = ?`,
            [user.id]
        );

        res.json({ message: "Subscription activated for 7 days" });

    } catch (err) {
        console.error("SUBSCRIPTION ERROR:", err);
        res.status(500).json({ error: "Database error" });
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
})
