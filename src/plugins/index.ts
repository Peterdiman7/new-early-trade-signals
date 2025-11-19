import createRouter from "@/router"
import pinia from "./pinia"

import { type App } from "vue"

export const registerPlugins = (app: App): Promise<void> => {
    return new Promise<void>((resolve) => {
        app.use(createRouter())
        app.use(pinia)

        resolve()
    })
}
