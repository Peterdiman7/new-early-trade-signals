import { defineStore } from "pinia"
import { ref, computed } from "vue"

const API_URL = "https://back.early-trade-signals.com"

export const useAuthStore = defineStore("auth", () => {
    const _loggedIn = ref(false)
    const _user = ref<null | {
        id: number
        username: string
        email: string
        subscription_expires_at: string | null
    }>(null)

    const loggedIn = computed(() => _loggedIn.value)

    const subscriptionActive = computed(() => {
        if (!_user.value?.subscription_expires_at) return false
        const expires = new Date(_user.value.subscription_expires_at)
        return expires > new Date()
    })

    const checkLogin = async () => {
        try {
            const res = await fetch(`${API_URL}/auth/me`, {
                credentials: "include",
            })
            if (res.ok) {
                const data = await res.json()
                _user.value = data
                _loggedIn.value = true
            } else {
                _user.value = null
                _loggedIn.value = false
            }
        } catch {
            _user.value = null
            _loggedIn.value = false
        }
    }

    const logout = async () => {
        await fetch(`${API_URL}/auth/logout`, {
            method: "POST",
            credentials: "include",
        })
        _user.value = null
        _loggedIn.value = false
    }

    return { loggedIn, _user, checkLogin, logout, subscriptionActive }
})
