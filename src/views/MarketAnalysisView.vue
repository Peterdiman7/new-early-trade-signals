<template>
    <div class="market-analysis-view">
        <div class="glass-header">
            <h1>{{ pageTitle }}</h1>
            <p>{{ pageSubtitle }}</p>
        </div>

        <div class="analysis-grid">
            <div class="glass-card market-overview">
                <h2>{{ formatTranslation(t, 'market_analysis.overview.title') }}</h2>
                <div class="overview-stats">
                    <div v-for="stat in marketStats" :key="stat.label" class="stat-item">
                        <span class="stat-label">{{ stat.label }}</span>
                        <span class="stat-value" :class="stat.trend">{{ stat.value }}</span>
                        <span class="stat-price">{{ stat.price }}</span>
                    </div>
                </div>
            </div>

            <div class="glass-card sentiment-card">
                <h2>{{ formatTranslation(t, 'market_analysis.sentiment.title') }}</h2>
                <div class="sentiment-indicator">
                    <div class="sentiment-bar">
                        <div class="sentiment-fill bullish" :style="{ width: marketSentiment.value + '%' }"></div>
                    </div>
                    <div class="sentiment-labels">
                        <span class="bearish-label">{{ formatTranslation(t, 'market_analysis.sentiment.labels.bearish')
                            }}</span>
                        <span class="neutral-label">{{ formatTranslation(t, 'market_analysis.sentiment.labels.neutral')
                            }}</span>
                        <span class="bullish-label">{{ formatTranslation(t, 'market_analysis.sentiment.labels.bullish')
                            }}</span>
                    </div>
                    <div class="sentiment-value">{{ marketSentiment.value }}% {{ marketSentiment.label }}</div>
                </div>
                <p class="sentiment-description">{{ marketSentiment.description }}</p>
            </div>
        </div>

        <div class="glass-card trending-assets">
            <h2>{{ formatTranslation(t, 'market_analysis.trending_assets.title') }}</h2>
            <div class="assets-list">
                <div v-for="asset in trendingAssets" :key="asset.id" class="asset-item">
                    <div class="asset-info">
                        <span class="asset-name">{{ asset.name }}</span>
                        <span class="asset-symbol">{{ asset.symbol }}</span>
                    </div>
                    <div class="asset-metrics">
                        <span class="asset-price">${{ asset.price }}</span>
                        <span class="asset-change" :class="asset.change > 0 ? 'positive' : 'negative'">
                            {{ asset.change > 0 ? '+' : '' }}{{ asset.change }}%
                        </span>
                    </div>
                    <div class="asset-trend">
                        <div class="mini-chart" :class="asset.change > 0 ? 'up' : 'down'"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="analysis-grid">
            <div v-for="analysis in analyses" :key="analysis.id" class="glass-card analysis-card">
                <h3>{{ analysis.title }}</h3>
                <p class="analysis-text">{{ analysis.text }}</p>
                <div class="analysis-tags">
                    <span v-for="tag in analysis.tags" :key="tag" class="tag">{{ tag }}</span>
                </div>
            </div>
        </div>

        <div class="glass-card news-section">
            <h2>{{ formatTranslation(t, 'market_analysis.news.title') }}</h2>
            <div class="news-list">
                <div v-for="news in marketNews" :key="news.id" class="news-item">
                    <div class="news-content">
                        <h4>{{ news.title }}</h4>
                        <p>{{ news.description }}</p>
                        <span class="news-time">{{ news.time }}</span>
                    </div>
                    <div class="news-impact" :class="news.impact">{{ news.impact }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { formatTranslation } from '@/utils/i18'

const { t } = useI18n()

const pageTitle = computed(() => formatTranslation(t, 'market_analysis.title'))
const pageSubtitle = computed(() => formatTranslation(t, 'market_analysis.subtitle'))

const marketStats = computed(() => [
    { label: formatTranslation(t, 'SP500'), value: '+1.24%', price: '4,567.89', trend: 'positive' },
    { label: formatTranslation(t, 'NASDAQ'), value: '+2.15%', price: '14,234.56', trend: 'positive' },
    { label: formatTranslation(t, 'Bitcoin'), value: '-0.85%', price: '$45,123', trend: 'negative' },
    { label: formatTranslation(t, 'Gold'), value: '+0.45%', price: '$2,045', trend: 'positive' }
])

const marketSentiment = computed(() => ({
    value: 68,
    label: marketSentimentLabel(68),
    description: formatTranslation(t, 'market_analysis.sentiment.description')
}))

function marketSentimentLabel(value) {
    if (value > 50) return formatTranslation(t, 'market_analysis.sentiment.labels.bullish')
    if (value < 50) return formatTranslation(t, 'market_analysis.sentiment.labels.bearish')
    return formatTranslation(t, 'market_analysis.sentiment.labels.neutral')
}

const trendingAssets = computed(() => [
    { id: 1, name: 'Tesla Inc.', symbol: 'TSLA', price: '245.75', change: 5.2 },
    { id: 2, name: 'Apple Inc.', symbol: 'AAPL', price: '178.50', change: 2.8 },
    { id: 3, name: 'Bitcoin', symbol: 'BTC', price: '45,123', change: -1.5 },
    { id: 4, name: 'Ethereum', symbol: 'ETH', price: '2,450', change: 3.4 },
    { id: 5, name: 'NVIDIA', symbol: 'NVDA', price: '512.30', change: 4.1 },
])

const marketNews = computed(() => [
    {
        id: 1,
        title: formatTranslation(t, 'market_analysis.news.fed_rate.title'),
        description: formatTranslation(t, 'market_analysis.news.fed_rate.description'),
        time: '2 hours ago',
        impact: 'high'
    },
    {
        id: 2,
        title: formatTranslation(t, 'market_analysis.news.tech_sector.title'),
        description: formatTranslation(t, 'market_analysis.news.tech_sector.description'),
        time: '5 hours ago',
        impact: 'high'
    },
    {
        id: 3,
        title: formatTranslation(t, 'market_analysis.news.crypto_interest.title'),
        description: formatTranslation(t, 'market_analysis.news.crypto_interest.description'),
        time: '8 hours ago',
        impact: 'medium'
    },
    {
        id: 4,
        title: formatTranslation(t, 'market_analysis.news.oil_prices.title'),
        description: formatTranslation(t, 'market_analysis.news.oil_prices.description'),
        time: '12 hours ago',
        impact: 'medium'
    }
])

const analyses = computed(() => [
    {
        id: 'technical',
        title: formatTranslation(t, 'market_analysis.technical.title'),
        text: formatTranslation(t, 'market_analysis.technical.text'),
        tags: [
            formatTranslation(t, 'market_analysis.technical.tags.support_strong'),
            formatTranslation(t, 'market_analysis.technical.tags.momentum_positive'),
            formatTranslation(t, 'market_analysis.technical.tags.volume_healthy')
        ]
    },
    {
        id: 'fundamental',
        title: formatTranslation(t, 'market_analysis.fundamental.title'),
        text: formatTranslation(t, 'market_analysis.fundamental.text'),
        tags: [
            formatTranslation(t, 'market_analysis.fundamental.tags.earnings_strong'),
            formatTranslation(t, 'market_analysis.fundamental.tags.fed_dovish'),
            formatTranslation(t, 'market_analysis.fundamental.tags.growth_positive')
        ]
    }
])
</script>


<style scoped>
.market-analysis-view {
    min-height: 100vh;
    padding: 2rem;
}

.glass-header {
    text-align: center;
    margin-bottom: 3rem;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    border-radius: 24px;
    border: 1px solid gray;
}

.glass-header h1 {
    font-size: 3rem;
    font-weight: 700;
    background: linear-gradient(135deg, #60a5fa, #a78bfa);
    -webkit-background-clip: text;
    margin-bottom: 0.5rem;
}

.glass-header p {
    font-size: 1.1rem;
}

.glass-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    border: 1px solid gray;
    padding: 2rem;
    margin-bottom: 2rem;
}

.glass-card h2 {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
    font-weight: 600;
}

.glass-card h3 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    font-weight: 600;
}

.analysis-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
}

.overview-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
}

.stat-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 16px;
    border: 1px solid gray;
}

.stat-label {
    font-size: 0.9rem;
    font-weight: 500;
}

.stat-value {
    font-size: 1.5rem;
    font-weight: 700;
}

.stat-value.positive {
    color: #22c55e;
}

.stat-value.negative {
    color: #ef4444;
}

.stat-price {
    font-size: 1.1rem;
}

.sentiment-indicator {
    margin: 2rem 0;
}

.sentiment-bar {
    width: 100%;
    height: 12px;
    background: linear-gradient(90deg, #ef4444 0%, #fbbf24 50%, #22c55e 100%);
    border-radius: 6px;
    position: relative;
    overflow: hidden;
    margin-bottom: 1rem;
}

.sentiment-fill {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    backdrop-filter: blur(10px);
}

.sentiment-labels {
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
    margin-bottom: 1rem;
}

.sentiment-value {
    text-align: center;
    font-size: 1.5rem;
    font-weight: 700;
    color: #22c55e;
    margin-bottom: 1rem;
}

.sentiment-description {
    line-height: 1.6;
}

.assets-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.asset-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 16px;
    border: 1px solid gray;
    transition: all 0.3s ease;
}

.asset-item:hover {
    background: rgba(255, 255, 255, 0.06);
    transform: translateX(8px);
}

.asset-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    flex: 1;
}

.asset-name {
    font-weight: 600;
    font-size: 1rem;
}

.asset-symbol {
    font-size: 0.85rem;
}

.asset-metrics {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.25rem;
    margin: 0 2rem;
}

.asset-price {
    color: white;
    font-weight: 600;
    font-size: 1.1rem;
}

.asset-change {
    font-weight: 700;
    font-size: 0.9rem;
}

.asset-change.positive {
    color: #22c55e;
}

.asset-change.negative {
    color: #ef4444;
}

.mini-chart {
    width: 80px;
    height: 40px;
    border-radius: 8px;
}

.mini-chart.up {
    background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.05));
    border: 1px solid rgba(34, 197, 94, 0.3);
}

.mini-chart.down {
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.05));
    border: 1px solid rgba(239, 68, 68, 0.3);
}

.analysis-text {
    line-height: 1.8;
    margin-bottom: 1.5rem;
}

.analysis-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
}

.tag {
    padding: 0.5rem 1rem;
    background: rgba(96, 165, 250, 0.15);
    border: 1px solid rgba(96, 165, 250, 0.3);
    border-radius: 20px;
    color: #60a5fa;
    font-size: 0.85rem;
    font-weight: 500;
}

.news-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.news-item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 16px;
    border: 1px solid gray;
    transition: all 0.3s ease;
}

.news-item:hover {
    background: rgba(255, 255, 255, 0.06);
    transform: translateX(8px);
}

.news-content {
    flex: 1;
    margin-right: 1.5rem;
}

.news-content h4 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
}

.news-content p {
    line-height: 1.6;
    margin-bottom: 0.75rem;
}

.news-time {
    font-size: 0.85rem;
}

.news-impact {
    padding: 0.5rem 1rem;
    border-radius: 12px;
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
}

.news-impact.high {
    background: rgba(239, 68, 68, 0.2);
    color: #ef4444;
    border: 1px solid rgba(239, 68, 68, 0.3);
}

.news-impact.medium {
    background: rgba(251, 191, 36, 0.2);
    color: #fbbf24;
    border: 1px solid rgba(251, 191, 36, 0.3);
}

@media (max-width: 768px) {
    .market-analysis-view {
        padding: 1rem;
    }

    .glass-header h1 {
        font-size: 2rem;
    }

    .analysis-grid {
        grid-template-columns: 1fr;
    }

    .overview-stats {
        grid-template-columns: 1fr;
    }

    .asset-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }

    .asset-metrics {
        align-items: flex-start;
        margin: 0;
    }

    .news-item {
        flex-direction: column;
        gap: 1rem;
    }

    .news-content {
        margin-right: 0;
    }
}
</style>