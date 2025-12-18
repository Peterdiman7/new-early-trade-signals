import { defineStore } from "pinia"
import { ref } from "vue"

export const useSessionStore = defineStore("session", () => {
    const email = ref<string | null>(null)
    const clickId = ref<string | null>(null)

    const setEmail = (value: string | null) => {
        email.value = value
    }

    const setClickId = (value: string | null) => {
        clickId.value = value
    }

    const clearSession = () => {
        email.value = null
        clickId.value = null
    }

    return {
        email,
        clickId,
        setEmail,
        setClickId,
        clearSession
    }
}, {
    persist: {
        storage: sessionStorage, // Use sessionStorage instead of localStorage
        paths: ['email', 'clickId']
    }
})