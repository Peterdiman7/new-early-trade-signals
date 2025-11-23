import createRouter from "@/router"
import pinia from "./pinia"
import { type App } from "vue"
import i18n from "./i18n"

export const registerPlugins = (app: App): Promise<void> => {
    return new Promise<void>((resolve) => {
        app.use(createRouter())
        app.use(pinia)
        app.use(i18n)
        resolve()
    })
}
