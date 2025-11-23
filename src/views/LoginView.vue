<template>
    <div class="login-page">
        <div class="login-card">
            <h1>{{ formatTranslation(t, 'login.title') }}</h1>
            <form @submit.prevent="login">
                <div class="form-group">
                    <label style="color: black;">{{ formatTranslation(t, 'login.username') }}</label>
                    <input type="text" v-model="username" required />
                </div>
                <div class="form-group">
                    <label style="color: black;">{{ formatTranslation(t, 'login.password') }}</label>
                    <input type="password" v-model="password" required />
                </div>
                <button class="btn" type="submit">{{ formatTranslation(t, 'login.button') }}</button>
            </form>

            <p v-if="error" class="error">{{ error }}</p>
            <p v-if="success" class="success">{{ success }}</p>

            <p class="register-link">
                {{ formatTranslation(t, 'login.no_account') }}
                <a style="color: green; cursor: pointer;" v-if="subdomain === 'de'" href="https://delp1.early-trade-signals.com/">{{ formatTranslation(t, 'login.register_here') }}</a>
                <router-link v-else to="/register">{{ formatTranslation(t, 'login.register_here') }}</router-link>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

import { useRouter } from "vue-router"
import { useI18n } from 'vue-i18n'

import { useAuthStore } from "@/stores/auth"
import { formatTranslation } from '@/utils/i18'

const { t } = useI18n()

const username = ref("")
const password = ref("")
const error = ref("")
const success = ref("")
const router = useRouter()
const authStore = useAuthStore()

const subdomain = typeof window !== 'undefined' ? window.location.hostname.split('.')[0] : ''

const login = async () => {
    error.value = ""
    success.value = ""

    try {
        const response = await fetch("https://back.early-trade-signals.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // important to send/receive cookies
            body: JSON.stringify({
                username: username.value,
                password: password.value
            })
        })

        const data = await response.json()

        if (!response.ok) {
            error.value = data.error || "Login failed"
            return
        }

        success.value = data.message || "Login successful"

        await authStore.checkLogin()

        setTimeout(() => {
            router.push("/")
        }, 1000)
    } catch (err) {
        error.value = "Network error"
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
}

.login-card {
    background: white;
    padding: 2rem;
    border: 1px solid gray;
    border-radius: 12px;
    box-shadow: var(--shadow-lg);
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

.btn {
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 8px;
    background-color: #22823A;
    color: white;
    font-weight: bold;
    cursor: pointer;
    width: 100%;
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
    text-align: center;
}

.register-link a {
    color: #22823A;
    font-weight: bold;
    text-decoration: none;
}

.register-link a:hover {
    text-decoration: underline;
}
</style>
