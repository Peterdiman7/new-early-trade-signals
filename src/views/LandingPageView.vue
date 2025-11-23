<template>
  <div class="page">
    <!-- Banner -->
    <img class="variant-banner" alt="Offer banner" />

    <!-- Hero -->
    <header class="hero-header">
      <div class="hero-icons">🔒 🛡️ 👤</div>
      <div class="hero-badge">⚡ $1.95</div>
      <h1 class="hero-title">Human Verification</h1>
      <p class="hero-subtitle">Additional Verification Required To Continue</p>
      <div class="hero-stars">⭐⭐⭐⭐⭐</div>
      <div class="hero-label">CREDIT CARD VERIFICATION</div>
    </header>

    <!-- Payment Card -->
    <main class="container">
      <div class="card">
        <form class="form" @submit.prevent="submitPayment">
          <div class="field">
            <label class="label">Full Name</label>
            <input class="input" v-model="form.name" type="text" placeholder="Enter your full name" required />
          </div>

          <div class="field">
            <label class="label">Email</label>
            <input class="input" v-model="form.email" type="email" placeholder="Enter your email address" required />
          </div>

          <div class="field">
            <label class="label">Country</label>
            <select class="input" v-model="form.country" required>
              <option value="" disabled>Select your country</option>
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="CA">Canada</option>
              <option value="AU">Australia</option>
            </select>
          </div>

          <div class="field">
            <label class="label">Card Number</label>
            <input
              class="input"
              v-model="form.cardNumber"
              type="text"
              inputmode="numeric"
              placeholder="1234 5678 9012 3456"
              maxlength="19"
              required
            />
          </div>

          <div class="row">
            <div class="field">
              <label class="label">Expiry Date</label>
              <input class="input" v-model="form.expiry" type="month" required />
            </div>

            <div class="field">
              <label class="label">CVV</label>
              <input
                class="input"
                v-model="form.cvv"
                type="password"
                inputmode="numeric"
                maxlength="4"
                required
              />
            </div>
          </div>

          <button class="button" type="submit">Continue</button>
        </form>
      </div>

      <!-- Security -->
      <div class="security-badges">
        <span>🔒 SSL Secure</span>
        <span>🔐 Encrypted</span>
        <span>✓ 100% Secure</span>
        <span>🇺🇸 U.S. Hosted</span>
      </div>

      <!-- Footer -->
      <footer class="footer-content">
        <p class="footer-summary">
          <strong>What's Included:</strong>
          Premium content access • Ad-free experience • Exclusive features • Priority support • Multi-device streaming.
        </p>

        <button class="footer-toggle" @click="toggleFooter" :aria-expanded="footerOpen">
          <span>More details</span>
          <span class="arrow-icon">⌄</span>
        </button>

        <div class="footer-accordion" :class="{ 'is-open': footerOpen }">
          <p>
            <strong>Trial Terms:</strong>
            By completing this verification you start a trial for $1.95. The trial can be cancelled anytime.
          </p>
          <p>
            <strong>Security:</strong>
            Your payment details are encrypted and processed via industry-standard SSL.
          </p>
        </div>
      </footer>
    </main>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const footerOpen = ref(false)

const toggleFooter = () => {
  footerOpen.value = !footerOpen.value
}

const form = reactive({
  name: '',
  email: '',
  country: '',
  cardNumber: '',
  expiry: '',
  cvv: ''
})

const submitPayment = () => {
  console.log('Payment submitted', { ...form })
}
</script>

<style scoped>
/* ========== PAGE ========== */
.page {
  min-height: 100vh;
  background: #f3f4f6;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* ========== BANNER ========== */
.variant-banner {
  width: 100%;
  max-height: 120px;
  object-fit: cover;
}

/* ========== HERO ========== */
.hero-header {
  text-align: center;
  padding: 24px 16px;
}

.hero-icons {
  font-size: 20px;
  margin-bottom: 8px;
}

.hero-badge {
  display: inline-block;
  background: #22c55e;
  color: #fff;
  padding: 4px 12px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 12px;
}

.hero-title {
  font-size: 26px;
  font-weight: 700;
  margin: 8px 0;
}

.hero-subtitle {
  color: #4b5563;
  font-size: 15px;
}

.hero-stars {
  margin-top: 8px;
  font-size: 18px;
}

.hero-label {
  margin-top: 12px;
  font-size: 12px;
  letter-spacing: 1px;
  color: #6b7280;
}

/* ========== CONTAINER / CARD ========== */
.container {
  width: 100%;
  max-width: 420px;
  padding: 0 16px 32px;
}

.card {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

/* ========== FORM ========== */
.form {
  display: flex;
  flex-direction: column;
}

.field {
  margin-bottom: 16px;
}

.label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 600;
  color: #111827;
}

.input {
  width: 100%;
  height: 48px;
  padding: 10px 14px;
  font-size: 15px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  background: #f9fafb;
  outline: none;
}

.input:focus {
  border-color: #22c55e;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.15);
}

/* ========== ROW ========== */
.row {
  display: flex;
  gap: 12px;
}

/* ========== BUTTON ========== */
.button {
  height: 52px;
  margin-top: 8px;
  border: none;
  border-radius: 12px;
  background: #22c55e;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}

.button:hover {
  background: #16a34a;
}

/* ========== SECURITY BADGES ========== */
.security-badges {
  margin: 16px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  font-size: 13px;
  color: #374151;
}

/* ========== FOOTER ========== */
.footer-content {
  margin-top: 16px;
  font-size: 13px;
  color: #374151;
}

.footer-summary {
  margin-bottom: 12px;
}

.footer-toggle {
  background: none;
  border: none;
  padding: 0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
}

.footer-accordion {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.footer-accordion.is-open {
  max-height: 300px;
  margin-top: 12px;
}
</style>