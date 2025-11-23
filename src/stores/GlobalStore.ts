import i18n from "@/plugins/i18n"
import { defineStore } from "pinia"
export type GlobalStoreState = {
    locale: string
}
export const useGlobalStore = defineStore("globalStore", {
    state: () => ({
        locale: i18n.global.locale.value, // if you change the key name change it in plugins/keycloak.ts also
    } as GlobalStoreState),
    actions: {
        setLocale(locale: string) {
            i18n.global.locale.value = locale as typeof i18n.global.locale.value
            this.locale = locale
        },
    },
    persist: {
        storage: localStorage,
        paths: [ 'locale' ],
    },
})
