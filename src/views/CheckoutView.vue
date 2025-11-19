<template>
    <div class="checkout-view">
        <div class="checkout-container">
            <div class="checkout-header">
                <div class="logo-container">
                    <RouterLink to="/">
                        <img src="/images/logo.png" alt="MindSoulHub Logo" class="logo" />
                    </RouterLink>
                </div>
                <h1>Complete Your Purchase</h1>
                <div class="security-badge">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span>Secure Checkout</span>
                </div>
            </div>
            <div class="checkout-grid">
                <div class="payment-section">
                    <div class="glass-card">
                        <h2>Payment Method</h2>
                        <div class="payment-methods">
                            <button v-for="method in paymentMethods" :key="method.id"
                                :class="['payment-method-btn', { active: selectedPayment === method.id }]"
                                @click="selectedPayment = method.id" type="button">
                                <span class="method-icon">{{ method.icon }}</span>
                                <span>{{ method.name }}</span>
                            </button>
                        </div>
                        <div v-if="selectedPayment === 'card'" class="card-details">
                            <div class="form-group">
                                <label>Card Number</label>
                                <div class="card-input">
                                    <input type="text" v-model="cardNumber" placeholder="1234 5678 9012 3456"
                                        maxlength="19" @input="formatCardNumber" />
                                    <div class="card-brands">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                                            alt="Visa" />
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                                            alt="Mastercard" />
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Expiry Date</label>
                                    <input type="text" v-model="expiryDate" placeholder="MM/YY" maxlength="5"
                                        @input="formatExpiry" />
                                </div>
                                <div class="form-group">
                                    <label>CVV</label>
                                    <input type="text" v-model="cvv" placeholder="123" maxlength="4" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Cardholder Name</label>
                                <input type="text" v-model="cardholderName" placeholder="John Doe" />
                            </div>
                        </div>
                        <div v-if="selectedPayment === 'paypal'" class="paypal-info">
                            <p>You will be redirected to PayPal to complete your payment securely.</p>
                        </div>
                    </div>
                    <div class="glass-card">
                        <h2>Billing Information</h2>
                        <div class="form-group">
                            <label>Email Address</label>
                            <input type="email" v-model="billingInfo.email" placeholder="john@example.com" />
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>First Name</label>
                                <input type="text" v-model="billingInfo.firstName" placeholder="John" />
                            </div>
                            <div class="form-group">
                                <label>Last Name</label>
                                <input type="text" v-model="billingInfo.lastName" placeholder="Doe" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Address</label>
                            <input type="text" v-model="billingInfo.address" placeholder="123 Main Street" />
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>City</label>
                                <input type="text" v-model="billingInfo.city" placeholder="New York" />
                            </div>
                            <div class="form-group">
                                <label>Postal Code</label>
                                <input type="text" v-model="billingInfo.postalCode" placeholder="10001" />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Country</label>
                                <select v-model="billingInfo.country">
                                    <option value="">Select Country</option>
                                    <option value="US">United States</option>
                                    <option value="UK">United Kingdom</option>
                                    <option value="CA">Canada</option>
                                    <option value="AU">Australia</option>
                                    <option value="DE">Germany</option>
                                    <option value="FR">France</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>State/Province</label>
                                <input type="text" v-model="billingInfo.state" placeholder="NY" />
                            </div>
                        </div>
                    </div>
                    <div class="glass-card submit-section">
                        <label class="checkbox-label">
                            <input type="checkbox" v-model="agreedToTerms" />
                            <span>
                                I agree to the
                                <a href="/terms-conditions" target="_blank">Terms & Conditions</a>
                                and
                                <a href="#" @click.prevent>Privacy Policy</a>
                            </span>
                        </label>
                        <button class="submit-btn" :disabled="!canSubmit" @click="handleSubmit">
                            <span v-if="!processing">Complete Purchase</span>
                            <span v-else class="processing">
                                <span class="spinner" />
                                Processing...
                            </span>
                        </button>
                        <div class="security-info">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <span>Your payment information is encrypted and secure</span>
                        </div>
                    </div>
                </div>
                <div class="summary-section">
                    <div class="glass-card summary-card sticky">
                        <h2>Order Summary</h2>
                        <div class="plan-details">
                            <div class="plan-header">
                                <div :class="['plan-badge', selectedPlan.featured ? 'featured' : '']">
                                    {{ selectedPlan.name }}
                                </div>
                                <div class="plan-price">
                                    <span class="currency">{{ selectedCurrency.display }}</span>
                                    <span class="amount">{{ formatCurrency(basePrice) }}</span>
                                    <span class="period">/{{ displayPeriod }}</span>
                                </div>
                            </div>
                            <p class="plan-description">{{ selectedPlan.description }}</p>
                            <div class="plan-features-list">
                                <h4>Included Features:</h4>
                                <div v-for="(feature, index) in selectedPlan.features" :key="index"
                                    class="feature-item">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <span>{{ feature }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="price-breakdown">
                            <div class="breakdown-item">
                                <span>Subtotal</span>
                                <span>{{ formatCurrency(basePrice) }}</span>
                            </div>
                            <div class="breakdown-item" v-if="discount > 0">
                                <span>Discount ({{ discountPercent }}%)</span>
                                <span class="discount">-{{ selectedCurrency.display }}{{
                                    formatCurrency(discount) }}</span>
                            </div>
                            <div class="breakdown-divider" />
                            <div class="breakdown-item total">
                                <span>Total</span>
                                <span>{{ formatCurrency(total) }}</span>
                            </div>
                        </div>
                        <div class="money-back">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
                                <path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                            </svg>
                            <span>30-day money-back guarantee</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import { useRoute } from 'vue-router'

const route = useRoute()
const subdomain = typeof window !== 'undefined' ? window.location.hostname.split('.')[0] : ''
const supportedCountries = ['ku', 'ksa', 'iq', 'su']
const userCountry = supportedCountries.includes(subdomain) ? subdomain : null

const selectedPayment = ref('card')
const cardNumber = ref('')
const expiryDate = ref('')
const cvv = ref('')
const cardholderName = ref('')
const agreedToTerms = ref(false)
const processing = ref(false)
const billingCycle = ref<'month' | 'year'>('month')
const discount = ref(0)
const discountPercent = ref(0)

const billingInfo = ref({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    state: ''
})

const paymentMethods = [
    { id: 'card', name: 'Credit Card', icon: '💳' },
    { id: 'paypal', name: 'PayPal', icon: '🅿️' }
]

const pricingPlans = ref([
    {
        id: 1,
        name: 'Basic',
        description: 'Entry-level access for casual traders',
        priceMonthly: 9,
        priceAnnual: 89,
        features: ['3 signals per day', 'Basic chart insights', 'Community forum access'],
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
    },
    {
        id: 101,
        name: 'Daily Access',
        price: '0.100',
        period: 'day',
        description: 'Perfect for trying out our platform',
        features: ['Full library access', 'HD streaming', 'Works on mobile & web'],
        buttonText: 'Choose This Plan',
        featured: false
    },
    {
        id: 102,
        name: 'Weekly Access',
        price: '0.700',
        period: 'week',
        description: 'Best value for regular users',
        features: ['Full library access', 'Offline access', 'Priority support'],
        buttonText: 'Choose This Plan',
        featured: true
    },
    {
        id: 201,
        name: 'Daily Access',
        price: '1.50',
        period: 'day',
        description: 'Perfect for trying out our platform',
        features: ['Full library access', 'HD streaming', 'Works on all devices'],
        buttonText: 'Choose This Plan',
        featured: false
    },
    {
        id: 301,
        name: 'Daily Access',
        price: '0.240',
        period: 'day',
        description: 'Perfect for trying out our platform',
        features: ['Full library access', 'HD streaming', 'Cancel anytime'],
        buttonText: 'Choose This Plan',
        featured: false
    },
    {
        id: 302,
        name: 'Weekly Access',
        price: '0.700',
        period: 'week',
        description: 'Best value for regular users',
        features: ['Full library access', 'Offline access', 'Priority support'],
        buttonText: 'Choose This Plan',
        featured: true
    },
    {
        id: 401,
        name: 'Daily Access',
        price: '600',
        period: 'day',
        description: 'Perfect for trying out our platform',
        features: ['Full library access', 'HD streaming', 'Basic support'],
        buttonText: 'Choose This Plan',
        featured: false
    },
    {
        id: 402,
        name: 'Weekly Access',
        price: '1500',
        period: 'week',
        description: 'Best value for regular users',
        features: ['Full library access', 'Offline access', 'Priority support'],
        buttonText: 'Choose This Plan',
        featured: true
    },
    {
        id: 403,
        name: 'Monthly Access',
        price: '3600',
        period: 'month',
        description: 'Ultimate access for power users',
        features: ['Full library access', 'Offline access', 'VIP support', 'Multi-device'],
        buttonText: 'Choose This Plan',
        featured: false
    }
])

const selectedPlan = computed(() => {
    const planId = Number(route.query.plan)
    if (!Number.isFinite(planId)) return pricingPlans.value[2]
    return pricingPlans.value.find((p) => p.id === planId) || pricingPlans.value[2]
})

const currencyBySubdomain = {
    ku: { code: 'KWD', display: 'KWD', locale: 'en-KW' },
    ksa: { code: 'SAR', display: 'SAR', locale: 'en-SA' },
    iq: { code: 'IQD', display: 'IQD', locale: 'en-IQ' },
    su: { code: 'SDG', display: 'SDG', locale: 'en-SD' },
}

const selectedCurrency = computed(() => {
    if (userCountry && currencyBySubdomain[userCountry]) return currencyBySubdomain[userCountry]
    return { code: 'USD', display: '$', locale: 'en-US' }
})

function toNumber(value: any): number {
    if (value === null || value === undefined) return 0
    if (typeof value === 'number') return Number.isFinite(value) ? value : 0
    const n = parseFloat(String(value).replace(/[^0-9.\-]+/g, ''))
    return Number.isFinite(n) ? n : 0
}

const basePrice = computed(() => {
    const plan = selectedPlan.value
    if (!plan) return 0

    if (plan.period && plan.price !== undefined) {
        return toNumber(plan.price)
    }

    if (billingCycle.value === 'month' && plan.priceMonthly !== undefined) {
        return toNumber(plan.priceMonthly)
    }

    if (billingCycle.value === 'year' && plan.priceAnnual !== undefined) {
        return toNumber(plan.priceAnnual)
    }

    if (plan.price !== undefined) return toNumber(plan.price)

    return 0
})

const displayPeriod = computed(() => {
    const plan = selectedPlan.value
    if (plan?.period) return plan.period
    return billingCycle.value === 'month' ? 'month' : 'year'
})

function formatCurrency(value: number) {
    const cfg = selectedCurrency.value
    try {
        return new Intl.NumberFormat(cfg.locale, {
            style: 'currency',
            currency: cfg.code,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
            .format(value)
            .replace(/\s/g, '')
    } catch (e) {
        return value.toFixed(2)
    }
}

const subtotal = computed(() => {
    return basePrice.value
})

const total = computed(() => {
    const t = Math.max(0, subtotal.value - discount.value)
    return t
})

const canSubmit = computed(() => {
    if (!agreedToTerms.value) return false

    const requiredBilling =
        billingInfo.value.email &&
        billingInfo.value.firstName &&
        billingInfo.value.lastName

    if (!requiredBilling) return false

    if (selectedPayment.value === 'card') {
        return (
            cardNumber.value.trim().length > 0 &&
            expiryDate.value.trim().length > 0 &&
            cvv.value.trim().length > 0 &&
            cardholderName.value.trim().length > 0
        )
    }

    return true
})

function formatCardNumber(e: Event) {
    const input = e.target as HTMLInputElement
    const value = input.value.replace(/\D/g, '').slice(0, 16)
    const groups = value.match(/.{1,4}/g) || []
    cardNumber.value = groups.join(' ')
}

function formatExpiry(e: Event) {
    const input = e.target as HTMLInputElement
    let value = input.value.replace(/\D/g, '').slice(0, 4)
    if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2)
    expiryDate.value = value
}

async function handleSubmit() {
    if (!canSubmit.value) return
    processing.value = true

    setTimeout(() => {
        processing.value = false
        alert(`Payment successful! Welcome to ${selectedPlan.value.name} plan!`)
    }, 1500)
}
</script>

<style scoped>
.checkout-view {
    min-height: 100vh;
    padding: 2rem;
}

.checkout-container {
    max-width: 1400px;
    margin: 0 auto;
}

.logo-container {
    text-align: center;
    margin-bottom: 2rem;
    padding-top: 2rem;
}

.logo {
    width: 170px;
    height: auto;
    object-fit: contain;
    transition: transform 0.3s ease, opacity 0.3s ease;
    opacity: 0.9;
}

.logo:hover {
    transform: scale(1.05);
    opacity: 1;
}

.checkout-header {
    text-align: center;
    margin-bottom: 3rem;
}

.checkout-header h1 {
    font-size: 2.5rem;
    font-weight: 700;
    background: black;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 1rem;
}

.security-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: rgba(34, 197, 94, 0.1);
    border: 1px solid rgba(34, 197, 94, 0.3);
    border-radius: 20px;
    color: #22c55e;
    font-size: 0.9rem;
    font-weight: 600;
}

.checkout-grid {
    display: grid;
    grid-template-columns: 1fr 450px;
    gap: 2rem;
    align-items: start;
}

.glass-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    border: 1px solid gray;
    padding: 2rem;
    margin-bottom: 1.5rem;
}

.glass-card h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    font-weight: 600;
}

.payment-methods {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.payment-method-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.payment-method-btn:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(96, 165, 250, 0.3);
}

.payment-method-btn.active {
    background: rgba(105, 232, 119, 0.15);
    border-color: rgba(96, 250, 132, 0.5);
    color: gray;
}

.method-icon {
    font-size: 2rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
}

.form-group input,
.form-group select {
    width: 100%;
    padding: 0.875rem 1rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid black;
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.form-group input:focus,
.form-group select:focus {
    outline: none;
    border-color: rgba(96, 165, 250, 0.5);
    background: rgba(255, 255, 255, 0.08);
}

.form-group input::placeholder {
    color: rgba(255, 255, 255, 0.3);
}

.card-input {
    position: relative;
}

.card-brands {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    gap: 0.5rem;
}

.card-brands img {
    height: 24px;
    opacity: 0.7;
}

.form-row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
}

.paypal-info,
.crypto-info {
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 12px;
    text-align: center;
}

.crypto-options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
    margin-top: 1rem;
}

.crypto-btn {
    padding: 0.75rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
    cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
    width: 20px;
    height: 20px;
    cursor: pointer;
}

.checkbox-label a {
    color: green;
    text-decoration: none;
}

.checkbox-label a:hover {
    text-decoration: underline;
}

.submit-btn {
    width: 100%;
    padding: 1.25rem;
    background: rgb(110, 205, 110);
    border: none;
    border-radius: 12px;
    color: white;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 1rem;
}

.submit-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(96, 165, 250, 0.4);
}

.submit-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.processing {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
}

.spinner {
    width: 20px;
    height: 20px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.security-info {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.85rem;
}

.summary-card {
    position: relative;
}

.summary-card.sticky {
    position: sticky;
    top: 2rem;
}

.plan-badge {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    color: white;
    font-weight: 600;
    font-size: 0.9rem;
}

.plan-badge.featured {
    background: rgba(100, 175, 93, 0.2);
    border-color: rgba(77, 170, 89, 0.5);
    color: green;
}

.plan-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.plan-price {
    display: flex;
    align-items: baseline;
    gap: 0.25rem;
}

.currency {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
    font-weight: 600;
}

.amount {
    font-size: 1.6rem;
    font-weight: 700;
    color: white;
}

.period {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.9rem;
}

.plan-description {
    margin-bottom: 1.5rem;
    line-height: 1.5;
}

.plan-features-list h4 {
    color: white;
    font-size: 1rem;
    margin-bottom: 1rem;
}

.plan-features-list .feature-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.9rem;
    margin-bottom: 0.75rem;
}

.plan-features-list .feature-item svg {
    color: #22c55e;
    flex-shrink: 0;
}

.price-breakdown {
    margin: 2rem 0;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 12px;
}

.breakdown-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.75rem;
}

.breakdown-item.total {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0;
}

.breakdown-item .discount {
    color: #22c55e;
}

.breakdown-divider {
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
    margin: 1rem 0;
}

.promo-code {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
}

.promo-code input {
    flex: 1;
    padding: 0.75rem 1rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid gray;
    border-radius: 12px;
}

.promo-code button {
    padding: 0.75rem 1.5rem;
    background: limegreen;
    border: forestgreen;
    border-radius: 12px;
    color: green;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.promo-code button:hover:not(:disabled) {
    background: forestgreen;
}

.promo-code button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.billing-cycle-switch {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    margin-bottom: 1.5rem;
}

.billing-cycle-switch button {
    padding: 0.75rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid gray;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.billing-cycle-switch button.active {
    background: rgba(34, 197, 94, 0.2);
    border-color: rgba(34, 197, 94, 0.1);
    color: #22c55e;
}

.save-tag {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    background: rgba(34, 197, 94, 0.2);
    color: #22c55e;
    border-radius: 6px;
}

.money-back {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 1rem;
    background: rgba(34, 197, 94, 0.1);
    border: 1px solid rgba(34, 197, 94, 0.3);
    border-radius: 12px;
    color: #22c55e;
    font-size: 0.9rem;
    font-weight: 600;
}

@media (max-width: 1024px) {
    .checkout-grid {
        grid-template-columns: 1fr;
    }

    .summary-card.sticky {
        position: relative;
        top: 0;
    }
}

@media (max-width: 768px) {
    .checkout-view {
        padding: 1rem;
    }

    .payment-methods {
        grid-template-columns: 1fr;
    }

    .form-row {
        grid-template-columns: 1fr;
    }

    .crypto-options {
        grid-template-columns: 1fr;
    }
}
</style>
