<template>
    <div class="login-page">
        <div class="login-card">
            <h1 v-if="setupMode">{{ formatTranslation(t, 'login.setup_password') }}</h1>
            <h1 v-else>{{ formatTranslation(t, 'login.title') }}</h1>

            <!-- Setup Password Mode (new account from payment) -->
            <form v-if="setupMode" @submit.prevent="setupPassword">
                <div class="form-group">
                    <label style="color: black;">{{ formatTranslation(t, 'login.email') }}</label>
                    <input type="email" v-model="email" disabled />
                </div>

                <div class="form-group">
                    <label style="color: black;">{{ formatTranslation(t, 'login.new_password') }}</label>
                    <input type="password" v-model="password" required />
                </div>

                <div class="form-group">
                    <label style="color: black;">{{ formatTranslation(t, 'login.confirm_password') }}</label>
                    <input type="password" v-model="confirmPassword" required />
                </div>

                <button class="btn" type="submit">
                    {{ formatTranslation(t, 'login.set_password') }}
                </button>
            </form>

            <!-- Normal Login Mode -->
            <form v-else @submit.prevent="checkEmailAndLogin">
                <div class="form-group">
                    <label style="color: black;">{{ formatTranslation(t, 'login.email') }}</label>
                    <input type="email" v-model="email" required />
                </div>

                <!-- Password field (only shown after email check) -->
                <div v-if="showPasswordField" class="form-group">
                    <label style="color: black;">{{ formatTranslation(t, 'login.password') }}</label>
                    <input type="password" v-model="password" required />
                </div>

                <!-- New password fields (if account has no password) -->
                <template v-if="needsPasswordSetup">
                    <div class="form-group">
                        <label style="color: black;">{{ formatTranslation(t, 'login.new_password') }}</label>
                        <input type="password" v-model="password" required />
                    </div>

                    <div class="form-group">
                        <label style="color: black;">{{ formatTranslation(t, 'login.confirm_password') }}</label>
                        <input type="password" v-model="confirmPassword" required />
                    </div>
                </template>

                <button class="btn" type="submit">
                    <span v-if="!emailChecked">{{ formatTranslation(t, 'login.continue') }}</span>
                    <span v-else-if="needsPasswordSetup">{{ formatTranslation(t, 'login.set_password') }}</span>
                    <span v-else>{{ formatTranslation(t, 'login.button') }}</span>
                </button>
            </form>

            <p v-if="error" class="error">{{ error }}</p>
            <p v-if="success" class="success">{{ success }}</p>

            <p v-if="!setupMode" class="register-link">
                {{ formatTranslation(t, 'login.no_account') }}
                <a style="color: green; cursor: pointer;" v-if="subdomain === 'de'"
                    href="https://delp1.early-trade-signals.com/">
                    {{ formatTranslation(t, 'login.register_here') }}
                </a>
                <router-link v-else to="/register">
                    {{ formatTranslation(t, 'login.register_here') }}
                </router-link>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'
import { formatTranslation } from '@/utils/i18'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const API_URL = 'https://back.early-trade-signals.com'
const subdomain = typeof window !== 'undefined' ? window.location.hostname.split('.')[0] : ''

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const success = ref('')

const setupMode = ref(false)
const emailChecked = ref(false)
const showPasswordField = ref(false)
const needsPasswordSetup = ref(false)

onMounted(() => {
    // Check if coming from payment
    if (route.query.email && route.query.setup === 'true') {
        email.value = route.query.email as string
        setupMode.value = true
    }
})

async function setupPassword() {
    error.value = ''
    success.value = ''

    if (password.value !== confirmPassword.value) {
        error.value = 'Passwords do not match'
        return
    }

    if (password.value.length < 6) {
        error.value = 'Password must be at least 6 characters'
        return
    }

    try {
        const response = await fetch(`${API_URL}/auth/set-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        })

        const data = await response.json()

        if (!response.ok) {
            error.value = data.error || 'Failed to set password'
            return
        }

        success.value = 'Password set successfully! Logging in...'

        await authStore.checkLogin()

        setTimeout(() => {
            router.push('/')
        }, 1500)
    } catch (err) {
        error.value = 'Network error'
    }
}

async function checkEmailAndLogin() {
    error.value = ''

    // Step 1: Check if email is entered
    if (!emailChecked.value) {
        if (!email.value) {
            error.value = 'Please enter your email'
            return
        }

        try {
            const response = await fetch(`${API_URL}/auth/check-email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.value })
            })

            const data = await response.json()

            if (!response.ok) {
                error.value = data.error || 'Email not found'
                return
            }

            emailChecked.value = true

            if (data.hasPassword) {
                showPasswordField.value = true
            } else {
                needsPasswordSetup.value = true
            }

        } catch (err) {
            error.value = 'Network error'
        }
        return
    }

    // Step 2: Handle password setup
    if (needsPasswordSetup.value) {
        if (password.value !== confirmPassword.value) {
            error.value = 'Passwords do not match'
            return
        }

        if (password.value.length < 6) {
            error.value = 'Password must be at least 6 characters'
            return
        }

        await setupPassword()
        return
    }

    // Step 3: Normal login
    if (showPasswordField.value) {
        await normalLogin()
    }
}

async function normalLogin() {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        })

        const data = await response.json()

        if (!response.ok) {
            error.value = data.error || 'Login failed'
            return
        }

        success.value = 'Login successful!'

        await authStore.checkLogin()

        setTimeout(() => {
            router.push('/')
        }, 1000)
    } catch (err) {
        error.value = 'Network error'
    }
}
</script>

<style scoped>
.login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4rem;
    background: #f9fafb;
    min-height: 100vh;
}

.login-card {
    background: white;
    padding: 2rem;
    border: 1px solid gray;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    text-align: center;
}

.form-group {
    margin-bottom: 1.2rem;
    text-align: left;
}

input {
    width: 100%;
    padding: 0.8rem;
    margin-top: 0.4rem;
    border-radius: 8px;
    border: 1px solid #ccc;
}

input:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
}

.btn {
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 8px;
    background-color: #22823A;
    color: white;
    font-weight: bold;
    cursor: pointer;
    width: 100%;
    margin-top: 0.5rem;
}

.btn:hover {
    background-color: #2eb951;
}

.error {
    color: red;
    margin-top: 1rem;
}

.success {
    color: green;
    margin-top: 1rem;
}

.register-link {
    margin-top: 1rem;
    font-size: 0.9rem;
    color: #555;
}

.register-link a {
    color: #22823A;
    font-weight: bold;
    text-decoration: none;
}
</style>