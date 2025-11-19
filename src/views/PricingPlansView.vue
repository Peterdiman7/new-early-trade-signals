<template>
    <div class="pricing-view">
        <div class="glass-header">
            <h1>Choose Your Plan</h1>
            <p>Start trading smarter with our flexible pricing options</p>
            <div v-if="!isLocalPricing" class="billing-toggle">
                <button :class="{ active: billingCycle === 'monthly' }" @click="billingCycle = 'monthly'"
                    class="toggle-btn">
                    Monthly
                </button>
                <button :class="{ active: billingCycle === 'annual' }" @click="billingCycle = 'annual'"
                    class="toggle-btn">
                    Annual
                </button>
            </div>
        </div>
        <div class="pricing-grid">
            <div v-for="plan in pricingPlans" :key="plan.id" class="pricing-card glass-card"
                :class="{ featured: plan.featured }">
                <div v-if="plan.featured" class="featured-badge">Most Popular</div>
                <div class="plan-header">
                    <h3>{{ plan.name }}</h3>
                    <p class="plan-description">{{ plan.description }}</p>
                </div>
                <div class="plan-price">
                    <span class="currency">{{ getCurrency() }}</span>
                    <span class="amount">{{ getPrice(plan) }}</span>
                    <span class="period">/{{ getPeriod(plan) }}</span>
                </div>
                <div class="plan-features">
                    <div v-for="(feature, index) in plan.features" :key="index" class="feature-item">
                        <span class="check-icon">✓</span>
                        <span>{{ feature }}</span>
                    </div>
                </div>
                <button type="button" @click="selectPlan(plan)" class="plan-btn"
                    :class="plan.featured ? 'featured-btn' : ''">
                    {{ plan.buttonText }}
                </button>
            </div>
        </div>
        <div class="glass-card faq-section">
            <h2>Frequently Asked Questions</h2>
            <div class="faq-list">
                <div v-for="faq in faqs" :key="faq.id" class="faq-item" @click="toggleFaq(faq.id)">
                    <div class="faq-question">
                        <h4>{{ faq.question }}</h4>
                        <span class="faq-icon" :class="{ open: faq.isOpen }">›</span>
                    </div>
                    <div v-if="faq.isOpen" class="faq-answer">
                        {{ faq.answer }}
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!isLocalPricing" class="glass-card comparison-table">
            <h2>Feature Comparison</h2>
            <div class="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Feature</th>
                            <th>Starter</th>
                            <th>Pro</th>
                            <th>Enterprise</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="feature in comparisonFeatures" :key="feature.name">
                            <td class="feature-name">{{ feature.name }}</td>
                            <td class="feature-value">{{ feature.starter }}</td>
                            <td class="feature-value">{{ feature.pro }}</td>
                            <td class="feature-value">{{ feature.enterprise }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const billingCycle = ref('monthly')

const subdomain = window.location.hostname.split('.')[0]
const supportedCountries = ['ku', 'ksa', 'iq', 'su']
const userCountry = supportedCountries.includes(subdomain) ? subdomain : null

const localPricing = {
    ku: [
        {
            id: 101,
            name: "Daily Access",
            price: "0.100",
            period: "day",
            description: "Perfect for trying out our platform",
            features: ["Full library access", "HD streaming", "Works on mobile & web"],
            buttonText: 'Choose This Plan',
            featured: false
        },
        {
            id: 102,
            name: "Weekly Access",
            price: "0.700",
            period: "week",
            description: "Best value for regular users",
            features: ["Full library access", "Offline access", "Priority support"],
            buttonText: 'Choose This Plan',
            featured: true
        },
    ],
    ksa: [
        {
            id: 201,
            name: "Daily Access",
            price: "1.50",
            period: "day",
            description: "Perfect for trying out our platform",
            features: ["Full library access", "HD streaming", "Works on all devices"],
            buttonText: 'Choose This Plan',
            featured: false
        },
    ],
    iq: [
        {
            id: 301,
            name: "Daily Access",
            price: "0.240",
            period: "day",
            description: "Perfect for trying out our platform",
            features: ["Full library access", "HD streaming", "Cancel anytime"],
            buttonText: 'Choose This Plan',
            featured: false
        },
        {
            id: 302,
            name: "Weekly Access",
            price: "0.700",
            period: "week",
            description: "Best value for regular users",
            features: ["Full library access", "Offline access", "Priority support"],
            buttonText: 'Choose This Plan',
            featured: true
        },
    ],
    su: [
        {
            id: 401,
            name: "Daily Access",
            price: "600",
            period: "day",
            description: "Perfect for trying out our platform",
            features: ["Full library access", "HD streaming", "Basic support"],
            buttonText: 'Choose This Plan',
            featured: false
        },
        {
            id: 402,
            name: "Weekly Access",
            price: "1500",
            period: "week",
            description: "Best value for regular users",
            features: ["Full library access", "Offline access", "Priority support"],
            buttonText: 'Choose This Plan',
            featured: true
        },
        {
            id: 403,
            name: "Monthly Access",
            price: "3600",
            period: "month",
            description: "Ultimate access for power users",
            features: ["Full library access", "Offline access", "VIP support", "Multi-device"],
            buttonText: 'Choose This Plan',
            featured: false
        },
    ],
}

// Default pricing plans
const defaultPlans = [
    {
        id: 1,
        name: 'Basic',
        description: 'Entry-level access for casual traders',
        priceMonthly: 9,
        priceAnnual: 89,
        features: [
            '3 signals per day',
            'Basic chart insights',
            'Community forum access'
        ],
        buttonText: 'Choose This Plan',
        featured: false
    },
    {
        id: 2,
        name: 'Starter',
        description: 'Perfect for beginners exploring trading signals',
        priceMonthly: 29,
        priceAnnual: 279,
        features: [
            'Up to 10 signals per day',
            'Basic market analysis',
            'Email notifications',
            'Community access',
            'Mobile app access'
        ],
        buttonText: 'Choose This Plan',
        featured: false
    },
    {
        id: 3,
        name: 'Pro',
        description: 'For serious traders who need advanced tools',
        priceMonthly: 79,
        priceAnnual: 759,
        features: [
            'Unlimited signals',
            'Advanced market analysis',
            'Real-time push notifications',
            'Priority support',
            'Custom alerts',
            'Portfolio tracking',
            'Technical indicators',
            'All community features'
        ],
        buttonText: 'Choose This Plan',
        featured: true
    },
    {
        id: 4,
        name: 'Enterprise',
        description: 'Custom solutions for professional teams',
        priceMonthly: 199,
        priceAnnual: 1909,
        features: [
            'Everything in Pro',
            'Dedicated account manager',
            'API access',
            'Custom integrations',
            'Advanced analytics',
            'Team collaboration tools',
            'White-label options',
            'Priority signal delivery'
        ],
        buttonText: 'Choose This Plan',
        featured: false
    },
    {
        id: 5,
        name: 'Ultimate',
        description: 'All-in-one solution for institutions and hedge funds',
        priceMonthly: 499,
        priceAnnual: 4799,
        features: [
            'Everything in Enterprise',
            'Institutional-grade analytics',
            'Unlimited team members',
            '24/7 dedicated support',
            'On-site consulting',
            'Custom AI-driven strategies',
            'Private community access'
        ],
        buttonText: 'Choose This Plan',
        featured: false
    }
]

const isLocalPricing = computed(() => userCountry && localPricing[userCountry])
const pricingPlans = ref(isLocalPricing.value ? localPricing[userCountry] : defaultPlans)

const faqs = ref([
    {
        id: 1,
        question: 'Can I cancel my subscription anytime?',
        answer: 'Yes, you can cancel your subscription at any time. You will continue to have access until the end of your billing period.',
        isOpen: false
    },
    {
        id: 2,
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards, PayPal, and cryptocurrency payments for your convenience.',
        isOpen: false
    },
    {
        id: 3,
        question: 'How accurate are your trading signals?',
        answer: 'Our signals maintain a 90% accuracy rate based on historical performance. However, past performance does not guarantee future results.',
        isOpen: false
    },
    {
        id: 4,
        question: 'Can I upgrade or downgrade my plan?',
        answer: 'Absolutely! You can change your plan at any time. Upgrades take effect immediately, while downgrades apply at the next billing cycle.',
        isOpen: false
    }
])

const comparisonFeatures = ref([
    { name: 'Daily Signals', starter: '10', pro: 'Unlimited', enterprise: 'Unlimited' },
    { name: 'Market Analysis', starter: 'Basic', pro: 'Advanced', enterprise: 'Advanced + Custom' },
    { name: 'Notifications', starter: 'Email', pro: 'Email + Push', enterprise: 'All Channels' },
    { name: 'Support', starter: 'Email', pro: 'Priority', enterprise: 'Dedicated Manager' },
    { name: 'API Access', starter: '—', pro: '—', enterprise: '✓' },
    { name: 'Custom Alerts', starter: '—', pro: '✓', enterprise: '✓' },
    { name: 'Team Features', starter: '—', pro: '—', enterprise: '✓' }
])

function toggleFaq(id) {
    const faq = faqs.value.find(f => f.id === id)
    if (faq) {
        faq.isOpen = !faq.isOpen
    }
}

function getPrice(plan) {
    if (plan.price) {
        return plan.price
    }
    return billingCycle.value === 'monthly' ? plan.priceMonthly : plan.priceAnnual
}

function getPeriod(plan) {
    if (plan.period) {
        return plan.period
    }
    return billingCycle.value === 'monthly' ? 'month' : 'year'
}

function getCurrency() {
    switch (userCountry) {
        case 'ku': return 'KWD'
        case 'ksa': return 'SAR'
        case 'iq': return 'IQD'
        case 'su': return 'SDP'
        default: return '$'
    }
}

const selectPlan = (plan) => {
    router.push({ name: "checkout", query: { plan: plan.id } })
}
</script>

<style scoped>
.pricing-view {
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
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-header h1 {
    font-size: 3rem;
    font-weight: 700;
    background: black;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.5rem;
}

.glass-header p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
}

.billing-toggle {
    display: inline-flex;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.05);
    padding: 0.5rem;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.toggle-btn {
    padding: 0.75rem 1.5rem;
    background: transparent;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.toggle-btn.active {
    background: rgba(207, 236, 196, 0.2);
    border: 1px solid rgba(125, 219, 133, 0.3);
}

.pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
}

.glass-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    border-radius: 24px;
    border: 1px solid gray;
    padding: 2rem;
    margin-bottom: 2rem;
}

.pricing-card {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    transition: all 0.3s ease;
}

.plan-features {
    flex-grow: 1;
    margin: 2rem 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.plan-btn {
    margin-top: auto;
}

.pricing-card:hover {
    transform: translateY(-12px);
    border-color: rgb(93, 88, 88);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.pricing-card.featured {
    border-color: #22823A;
    background: #c3f0cf;
}

.featured-badge {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #22823A;
    color: white;
    padding: 0.5rem 1.5rem;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 700;
    box-shadow: 0 4px 12px #4fa163;
}

.plan-header h3 {
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
}

.plan-description {
    font-size: 0.95rem;
    line-height: 1.5;
}

.plan-price {
    margin: 2rem 0;
    display: flex;
    align-items: baseline;
    gap: 0.25rem;
}

.currency {
    font-size: 1.5rem;
    font-weight: 600;
}

.amount {
    font-size: 3.5rem;
    font-weight: 700;
    line-height: 1;
}

.period {
    font-size: 1rem;
}

.feature-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.95rem;
}

.check-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    background: rgba(34, 197, 94, 0.2);
    color: #22c55e;
    border-radius: 50%;
    font-weight: 700;
    flex-shrink: 0;
}

.plan-btn {
    width: 100%;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: auto;
}

.plan-btn:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
}

.featured-btn {
    background: var(--theme-color);
    color: white;
    border: none;
}

.featured-btn:hover {
    background: #3eba5d;
    box-shadow: 0 8px 24px rgba(96, 165, 250, 0.4);
}

.faq-section h2,
.comparison-table h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
    font-weight: 700;
    text-align: center;
}

.faq-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.faq-item {
    background: rgba(255, 255, 255, 0.03);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;
}

.faq-item:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(96, 165, 250, 0.3);
}

.faq-question {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
}

.faq-question h4 {
    font-size: 1.1rem;
    font-weight: 600;
}

.faq-icon {
    color: #60a5fa;
    font-size: 1.5rem;
    font-weight: 300;
    transition: transform 0.3s ease;
}

.faq-icon.open {
    transform: rotate(90deg);
}

.faq-answer {
    padding: 0 1.5rem 1.5rem;
    line-height: 1.6;
    animation: slideDown 0.3s ease;
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.table-wrapper {
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
}

thead {
    background: rgba(255, 255, 255, 0.03);
}

th {
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

th:first-child {
    border-top-left-radius: 12px;
}

th:last-child {
    border-top-right-radius: 12px;
}

td {
    padding: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.feature-name {
    font-weight: 500;
}

.feature-value {
    text-align: center;
}

tbody tr:hover {
    background: rgba(255, 255, 255, 0.03);
}

@media (max-width: 768px) {
    .pricing-view {
        padding: 1rem;
    }

    .glass-header h1 {
        font-size: 2rem;
    }

    .pricing-grid {
        grid-template-columns: 1fr;
    }

    .billing-toggle {
        flex-direction: column;
        width: 100%;
    }

    .toggle-btn {
        width: 100%;
        justify-content: center;
    }

    .amount {
        font-size: 2.5rem;
    }

    table {
        font-size: 0.9rem;
    }

    th,
    td {
        padding: 0.75rem 0.5rem;
    }
}
</style>