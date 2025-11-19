<template>
    <div class="signals-page">
        <div class="glass-header">
            <h1>Live Trading Signals</h1>
            <p>Real-time trading recommendations powered by market data analysis</p>
            <div class="last-updated" v-if="!loading && signals.length > 0">
                <img class="update-icon" src="/images/refresh.webp" alt="refresh">
                Last updated: {{ formatDate(lastUpdated) }}
                <span class="auto-refresh">• Auto-refreshes every 30s</span>
            </div>
        </div>

        <div v-if="loading" class="loading-container">
            <div class="spinner"></div>
            <p>Loading latest signals...</p>
        </div>

        <div v-else-if="error" class="error-container glass-card">
            <div class="error-icon">⚠️</div>
            <h3>Unable to Load Signals</h3>
            <p>{{ error }}</p>
            <button @click="loadSignals" class="retry-btn">Retry</button>
        </div>

        <template v-else>
            <div class="signals-stats">
                <div class="stat-card">
                    <div class="stat-value">{{ buyCount }}</div>
                    <div class="stat-label">Buy Signals</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">{{ holdCount }}</div>
                    <div class="stat-label">Hold Signals</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">{{ sellCount }}</div>
                    <div class="stat-label">Sell Signals</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">{{ signals.length }}</div>
                    <div class="stat-label">Total Tracked</div>
                </div>
            </div>

            <div class="signals-grid">
                <div v-for="signal in signals" :key="signal.symbol" class="signal-card glass-card"
                    :class="getSignalClass(signal.recommendation)">
                    <div class="signal-header">
                        <div class="company-info">
                            <h3>{{ signal.symbol }}</h3>
                            <p class="company-name">{{ getCompanyName(signal.symbol) }}</p>
                        </div>

                        <div class="signal-badge" :class="getSignalClass(signal.recommendation)">
                            <span>{{ signal.recommendation }}</span>
                        </div>
                    </div>

                    <div class="signal-metrics">
                        <div class="metric">
                            <span class="metric-label">Current Price</span>
                            <span class="metric-value price">${{ signal.price }}</span>
                        </div>

                        <div class="metric">
                            <span class="metric-label">Signal Strength</span>
                            <span class="metric-value" :class="getStrengthClass(signal.recommendation)">
                                {{ getSignalStrength(signal.recommendation) }}
                            </span>
                        </div>
                    </div>

                    <div class="signal-footer">
                        <div class="updated-time">
                            Updated {{ getTimeAgo(signal.updated_at) }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="api-info glass-card">
                <h3>About These Signals</h3>
                <p>
                    Trading signals are automatically updated every minute using real-time market data from Alpha
                    Vantage API.
                    Recommendations are based on:
                </p>
                <ul>
                    <li>Price momentum and trends</li>
                    <li>Intraday price range analysis</li>
                    <li>Technical indicators and market sentiment</li>
                </ul>

                <div class="signal-legend">
                    <div class="legend-item">
                        <span class="badge buy">Buy</span>
                        <span>Strong upward momentum (>3% gain + trading near highs)</span>
                    </div>

                    <div class="legend-item">
                        <span class="badge hold">Hold</span>
                        <span>Stable or moderate movement</span>
                    </div>

                    <div class="legend-item">
                        <span class="badge sell">Sell</span>
                        <span>Downward momentum (&lt;-3% loss or trading near lows)</span>
                    </div>
                </div>

                <div class="disclaimer">
                    <strong>Risk Disclaimer:</strong> Trading financial instruments involves significant risk.
                    These signals are for informational purposes only and should not be considered as financial advice.
                    Always conduct your own research and consult with a financial advisor before making investment
                    decisions.
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const API_URL = 'https://back.early-trade-signals.com'

const signals = ref([])
const loading = ref(true)
const error = ref(null)
const lastUpdated = ref(null)
let refreshInterval = null

const companyNames = {
    AAPL: 'Apple Inc.',
    MSFT: 'Microsoft Corporation',
    TSLA: 'Tesla Inc.',
    GOOGL: 'Alphabet Inc.',
    AMZN: 'Amazon.com Inc.',
    NVDA: 'NVIDIA Corporation',
    META: 'Meta Platforms Inc.',
    JPM: 'JPMorgan Chase & Co.',
    V: 'Visa Inc.',
    BAC: 'Bank of America Corp.',
    NFLX: 'Netflix Inc.',
    ADBE: 'Adobe Inc.',
    PYPL: 'PayPal Holdings Inc.',
    INTC: 'Intel Corporation',
    CSCO: 'Cisco Systems Inc.'
}

const buyCount = computed(() => signals.value.filter(s => s.recommendation === 'Buy').length)
const holdCount = computed(() => signals.value.filter(s => s.recommendation === 'Hold').length)
const sellCount = computed(() => signals.value.filter(s => s.recommendation === 'Sell').length)

function getCompanyName(symbol) {
    return companyNames[symbol] || symbol
}

async function loadSignals() {
    try {
        loading.value = true
        error.value = null

        const response = await fetch(`${API_URL}/signals`, {
            credentials: 'include'
        })

        if (!response.ok) {
            throw new Error('Failed to fetch signals')
        }

        const data = await response.json()
        signals.value = data.signals || []
        lastUpdated.value = data.lastUpdated || new Date().toISOString()

        if (signals.value.length === 0) {
            error.value = 'No signals available at the moment'
        }
    } catch (e) {
        console.error('Error loading signals:', e)
        error.value = 'Failed to load signals. Please try again later.'
    } finally {
        loading.value = false
    }
}

function getSignalClass(recommendation) {
    switch (recommendation) {
        case 'Buy': return 'buy'
        case 'Hold': return 'hold'
        case 'Sell': return 'sell'
        default: return 'neutral'
    }
}

function getSignalStrength(recommendation) {
    switch (recommendation) {
        case 'Buy': return 'Strong'
        case 'Hold': return 'Moderate'
        case 'Sell': return 'Weak'
        default: return 'Unknown'
    }
}

function getStrengthClass(recommendation) {
    switch (recommendation) {
        case 'Buy': return 'positive'
        case 'Sell': return 'negative'
        default: return ''
    }
}

function formatDate(dateString) {
    if (!dateString) return 'Just now'
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

function getTimeAgo(dateString) {
    if (!dateString) return 'just now'

    const date = new Date(dateString)
    const now = new Date()
    const seconds = Math.floor((now - date) / 1000)

    if (seconds < 60) return 'just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
}

onMounted(() => {
    loadSignals()

    // Auto-refresh every 30 seconds
    refreshInterval = setInterval(() => {
        loadSignals()
    }, 30000)
})

onUnmounted(() => {
    if (refreshInterval) {
        clearInterval(refreshInterval)
    }
})
</script>

<style scoped>
.signals-page {
    min-height: 100vh;
    padding: 2rem;
}

.glass-header {
    text-align: center;
    margin-bottom: 2rem;
    padding: 3rem 2rem;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.glass-header h1 {
    color: black;
    font-size: 3.5rem;
    font-weight: 900;
    -webkit-background-clip: text;
    margin-bottom: 0.5rem;
}

.glass-header p {
    font-size: 1.2rem;
    color: black;
    margin-bottom: 1rem;
}

.last-updated {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 50px;
    font-size: 0.95rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.update-icon {
    width: 20px;
    animation: rotate 2s linear infinite;
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.auto-refresh {
    font-size: 0.85rem;
}

.signals-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.stat-card {
    background: black;
    backdrop-filter: blur(20px);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 1.5rem;
    text-align: center;
    transition: all 0.3s ease;
}

.stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
}

.stat-value {
    font-size: 2.5rem;
    font-weight: 900;
    margin-bottom: 0.25rem;
}

.stat-label {
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.loading-container {
    text-align: center;
    padding: 4rem 2rem;
}

.spinner {
    width: 60px;
    height: 60px;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    margin: 0 auto 1.5rem;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.loading-container p {
    font-size: 1.2rem;
}

.error-container {
    text-align: center;
    padding: 3rem 2rem;
    max-width: 600px;
    margin: 0 auto;
}

.error-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
}

.error-container h3 {
    font-size: 1.75rem;
    margin-bottom: 1rem;
}

.error-container p {
    margin-bottom: 2rem;
}

.retry-btn {
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #22c55e, #16a34a);
    border: none;
    border-radius: 12px;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.retry-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(34, 197, 94, 0.4);
}

.signals-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.glass-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 1.75rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.signal-card {
    position: relative;
    overflow: hidden;
}

.signal-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.signal-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
}

.signal-card:hover::before {
    opacity: 1;
}

.signal-card.buy {
    border-color: rgba(34, 197, 94, 0.5);
    background: rgba(34, 197, 94, 0.05);
}

.signal-card.buy:hover {
    box-shadow: 0 20px 40px rgba(34, 197, 94, 0.3);
}

.signal-card.sell {
    border-color: rgba(239, 68, 68, 0.5);
    background: rgba(239, 68, 68, 0.05);
}

.signal-card.sell:hover {
    box-shadow: 0 20px 40px rgba(239, 68, 68, 0.3);
}

.signal-card.hold {
    border-color: rgba(251, 191, 36, 0.5);
    background: rgba(251, 191, 36, 0.05);
}

.signal-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.5rem;
    position: relative;
    z-index: 1;
}

.company-info h3 {
    color: black;
    font-size: 1.75rem;
    font-weight: 900;
    margin-bottom: 0.25rem;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.company-name {
    font-size: 0.9rem;
    color: black;
}

.signal-badge {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.65rem 1.25rem;
    border-radius: 12px;
    font-weight: 800;
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.badge-icon {
    font-size: 1.2rem;
}

.signal-badge.buy {
    background: linear-gradient(135deg, #22c55e, #16a34a);
    color: white;
}

.signal-badge.hold {
    background: linear-gradient(135deg, #fbbf24, #f59e0b);
}

.signal-badge.sell {
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: white;
}

.signal-metrics {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
    margin-bottom: 1.5rem;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    border: 1px solid gray;
}

.metric {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.metric-label {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: black;
}

.metric-value {
    font-size: 1.25rem;
    font-weight: 800;
    color: black;
}

.metric-value.price {
    color: black;
}

.metric-value.positive {
    color: #22c55e;
}

.metric-value.negative {
    color: #ef4444;
}

.signal-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1rem;
    color: black;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.updated-time {
    font-size: 0.85rem;
    color: black;
}

.api-info {
    max-width: 900px;
    margin: 0 auto;
    color: black;
}

.api-info h3 {
    font-size: 1.75rem;
    margin-bottom: 1rem;
    color: white;
}

.api-info p {
    line-height: 1.8;
    margin-bottom: 1rem;
    color: rgba(255, 255, 255, 0.9);
}

.api-info ul {
    list-style: none;
    padding-left: 0;
    margin-bottom: 2rem;
}

.api-info ul li {
    padding: 0.5rem 0;
    padding-left: 1.5rem;
    position: relative;
}

.api-info ul li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #22c55e;
    font-weight: bold;
}

.signal-legend {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
}

.legend-item .badge {
    padding: 0.5rem 1rem;
    border-radius: 10px;
    font-weight: 700;
    font-size: 0.9rem;
    white-space: nowrap;
}

.legend-item .badge.buy {
    background: linear-gradient(135deg, #22c55e, #16a34a);
    color: white;
}

.legend-item .badge.hold {
    background: linear-gradient(135deg, #fbbf24, #f59e0b);
    color: white;
}

.legend-item .badge.sell {
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: black;
}

.legend-item span:last-child {
    font-size: 0.95rem;
    color: black;
}

.disclaimer {
    padding: 1.5rem;
    background: rgba(239, 68, 68, 0.1);
    border: 2px solid rgba(239, 68, 68, 0.3);
    border-radius: 12px;
    color: black;
    line-height: 1.6;
}

.disclaimer strong {
    color: #fbbf24;
}

@media (max-width: 768px) {
    .signals-page {
        padding: 1rem;
    }

    .glass-header h1 {
        font-size: 2rem;
    }

    .signals-grid {
        grid-template-columns: 1fr;
    }

    .signal-metrics {
        grid-template-columns: 1fr;
    }

    .signals-stats {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>