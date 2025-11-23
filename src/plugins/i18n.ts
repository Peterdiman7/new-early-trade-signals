import { createI18n } from "vue-i18n"
import messages from "@/messages.json"

export default createI18n({
    legacy: false,
    locale: "de",
    fallbackLocale: "en",
    messages,
    warnHtmlMessage: false,
})
