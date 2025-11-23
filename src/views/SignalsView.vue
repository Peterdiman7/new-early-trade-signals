<template>
    <div class="signals-page">
        <div class="glass-header">
            <h1>{{ formatTranslation(t, 'signals.title') }}</h1>
            <p>{{ formatTranslation(t, 'signals.subtitle') }}</p>
            <div class="last-updated" v-if="!loading && signals.length > 0">
                <img class="update-icon" src="/images/refresh.webp" alt="refresh">
                {{ formatTranslation(t, 'signals.last_updated') }}: {{ formatDate(lastUpdated) }}
                <span class="auto-refresh">{{ formatTranslation(t, 'signals.auto_refresh') }}</span>
            </div>
        </div>

        <div v-if="loading" class="loading-container">
            <div class="spinner"></div>
            <p>{{ formatTranslation(t, 'signals.loading') }}</p>
        </div>

        <div v-else-if="error" class="error-container glass-card">
            <div class="error-icon">⚠️</div>
            <h3>{{ formatTranslation(t, 'signals.error_title') }}</h3>
            <p>{{ error }}</p>
            <button @click="loadSignals" class="retry-btn">{{ formatTranslation(t, 'signals.retry') }}</button>
        </div>

        <template v-else>
            <div class="signals-stats">
                <div class="stat-card">
                    <div class="stat-value">{{ buyCount }}</div>
                    <div class="stat-label">{{ formatTranslation(t, 'signals.stats.buy') }}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">{{ holdCount }}</div>
                    <div class="stat-label">{{ formatTranslation(t, 'signals.stats.hold') }}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">{{ sellCount }}</div>
                    <div class="stat-label">{{ formatTranslation(t, 'signals.stats.sell') }}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">{{ signals.length }}</div>
                    <div class="stat-label">{{ formatTranslation(t, 'signals.stats.total') }}</div>
                </div>
            </div>

            <div class="signals-grid">
                <div v-for="signal in signals" :key="signal.symbol" class="signal-card glass-card"
                    :class="[signal.type === 'stock' ? 'stock' : 'commodity', getSignalClass(signal.recommendation).toLowerCase()]"
                    :style="signal.type === 'commodity' && signal.img_url ? { '--bg-url': `url(${signal.img_url})` } : {}">

                    <div class="signal-header">
                        <div style="display: flex;" class="company-info">
                            <h3>{{ signal.symbol }}</h3>
                            <p class="company-name">{{ getCompanyName(signal.symbol) }}</p>
                        </div>

                        <div class="signal-badge" :class="getSignalClass(signal.recommendation)">
                            <span>{{ signal.recommendation }}</span>
                        </div>
                    </div>
                    <div style="height: 70px;">
                        <img style="width: 50px;" :src="signal.img_url" :alt="signal.symbol">
                    </div>
                    <div class="signal-metrics">
                        <div class="metric">
                            <span class="metric-label">{{ formatTranslation(t, 'signals.metrics.current_price')
                                }}</span>
                            <span class="metric-value price">${{ signal.price }}</span>
                        </div>

                        <div class="metric">
                            <span class="metric-label">{{ formatTranslation(t, 'signals.metrics.signal_strength')
                                }}</span>
                            <span class="metric-value" :class="getStrengthClass(signal.recommendation)">
                                {{ getSignalStrength(signal.recommendation) }}
                            </span>
                        </div>
                    </div>

                    <div class="signal-footer">
                        <div class="updated-time">
                            {{ formatTranslation(t, 'signals.last_updated') }} {{ getTimeAgo(signal.updated_at) }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="api-info glass-card">
                <h3>{{ formatTranslation(t, 'signals.about_title') }}</h3>
                <p>{{ formatTranslation(t, 'signals.about_description') }}</p>
                <ul>
                    <li>{{ formatTranslation(t, 'signals.about_list.momentum') }}</li>
                    <li>{{ formatTranslation(t, 'signals.about_list.intraday') }}</li>
                    <li>{{ formatTranslation(t, 'signals.about_list.technical') }}</li>
                </ul>

                <div class="signal-legend">
                    <div class="legend-item">
                        <span class="badge buy">{{ formatTranslation(t, 'signals.legend.buy') }}</span>
                    </div>

                    <div class="legend-item">
                        <span class="badge hold">{{ formatTranslation(t, 'signals.legend.hold') }}</span>
                    </div>

                    <div class="legend-item">
                        <span class="badge sell">{{ formatTranslation(t, 'signals.legend.sell') }}</span>
                    </div>
                </div>

                <div class="disclaimer">
                    {{ formatTranslation(t, 'signals.disclaimer') }}
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { formatTranslation } from '@/utils/i18'

import { ref, onMounted, onUnmounted, computed } from 'vue'

import { useI18n } from 'vue-i18n'


const { t } = useI18n()
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

    @media (max-width: 768px) {
        padding: 1rem;
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

        h1 {
            color: black;
            font-size: 3.5rem;
            font-weight: 900;
            margin-bottom: 0.5rem;
            -webkit-background-clip: text;

            @media (max-width: 768px) {
                font-size: 2rem;
            }
        }

        p {
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

            .update-icon {
                width: 20px;
                animation: rotate 2s linear infinite;
            }

            .auto-refresh {
                font-size: 0.85rem;
            }
        }
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }

    .signals-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;

        .stat-card {
            background: black;
            backdrop-filter: blur(20px);
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 1.5rem;
            text-align: center;
            transition: all 0.3s ease;

            &:hover {
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
        }
    }

    .loading-container,
    .error-container {
        text-align: center;
        padding: 4rem 2rem;

        .spinner {
            width: 60px;
            height: 60px;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top-color: white;
            border-radius: 50%;
            margin: 0 auto 1.5rem;
            animation: spin 1s linear infinite;
        }

        p {
            font-size: 1.2rem;
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

            &:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 24px rgba(34, 197, 94, 0.4);
            }
        }
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    .signals-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;

        .signal-card {
            position: relative;
            overflow: hidden;
            border-radius: 20px;
            padding: 1.75rem;
            transition: all 0.3s ease;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);

            &.commodity::before {
                content: '';
                position: absolute;
                inset: 0;
                background-image: var(--bg-url);
                background-size: cover;
                background-position: center;
                z-index: 0;
            }

            &.stock {
                &.buy {
                    background: linear-gradient(135deg, #22c55e, #16a34a);
                    color: white;
                }

                &.hold {
                    background: linear-gradient(135deg, #fbbf24, #f59e0b);
                    color: black;
                }

                &.sell {
                    background: linear-gradient(135deg, #ef4444, #dc2626);
                    color: white;
                }

                &::before {
                    content: none;
                }
            }

            &:hover {
                transform: translateY(-8px);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
                border-color: rgba(255, 255, 255, 0.3);
            }

            .signal-header,
            .signal-metrics,
            .signal-footer {
                position: relative;
                z-index: 1;
            }

            .signal-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 1.5rem;

                .company-info {
                    h3 {
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

                    &.buy {
                        background: linear-gradient(135deg, #22c55e, #16a34a);
                        border: 1px solid white;
                        color: white;
                    }

                    &.hold {
                        background: linear-gradient(135deg, #fbbf24, #f59e0b);
                        border: 1px solid white;
                        color: black;
                    }

                    &.sell {
                        background: linear-gradient(135deg, #ef4444, #dc2626);
                        border: 1px solid white;
                        color: white;
                    }
                }
            }

            .signal-metrics {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 1.25rem;
                margin-bottom: 1.5rem;
                padding: 1.5rem;
                border-radius: 12px;
                border: 1px solid white;
                background: rgba(255, 255, 255, 1);
            }

            .metric {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;

                .metric-label {
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    color: black;
                }

                .metric-value {
                    font-size: 1.25rem;
                    font-weight: 800;

                    &.price {
                        color: black;
                    }

                    &.positive {
                        color: #22c55e;
                    }

                    &.negative {
                        color: #ef4444;
                    }
                }
            }

            .signal-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-top: 1rem;
                color: black;
                border-top: 1px solid rgba(255, 255, 255, 0.1);

                .updated-time {
                    font-size: 0.85rem;
                    color: black;
                }
            }
        }
    }
}
</style>
