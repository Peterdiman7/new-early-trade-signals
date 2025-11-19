<template>
    <section class="phone-number-container">
        <h2>Subscribe for 7 Days</h2>
        <p>Enter your phone number below to start your free 7-day subscription trial.</p>
        <div class="phone-form">
            <label for="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" v-model="phone" placeholder="e.g. +1 555 123 4567" required
                @input="onInput" />
            <button type="button" @click="activateSubscription" :disabled="!isValidPhone">
                Subscribe
            </button>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from "@/stores/auth"

const authStore = useAuthStore()
const phone = ref('')

const onInput = () => {
    phone.value = phone.value.replace(/\D/g, '')
}

const isValidPhone = computed(() => {
    return /^\d{3,15}$/.test(phone.value)
})

const activateSubscription = async () => {
    try {
        const response = await fetch("https://back.early-trade-signals.com/subscription/activate", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json()

        if (data) {
            console.log("Subscription activated:", data)
            await authStore.checkLogin()
        }

        console.log("Subscription activated:", data)
    } catch (err) {
        console.error("Activation error:", err)
    }
}
</script>

<style scoped>
.phone-number-container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 1.5rem;
    background: #ffffff;
    border-radius: 1rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    font-family: sans-serif;
}

.phone-number-container h2 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
    text-align: center;
}

.phone-number-container p {
    font-size: 0.95rem;
    margin-bottom: 1.25rem;
    text-align: center;
    color: #555;
}

.phone-form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.phone-form label {
    font-size: 0.9rem;
    color: #333;
    font-weight: 500;
}

.phone-form input[type="tel"] {
    padding: 0.65rem 0.75rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    font-size: 1rem;
}

.phone-form button {
    padding: 0.75rem;
    border: none;
    background: #22823A;
    color: white;
    font-size: 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background 0.2s ease, opacity 0.2s ease;
}

.phone-form button:hover:not(:disabled) {
    background: #2da64b;
}

.phone-form button:disabled {
    background: #ccc;
    cursor: not-allowed;
    opacity: 0.6;
}

.phone-form button:hover {
    background: #2da64b;
}
</style>