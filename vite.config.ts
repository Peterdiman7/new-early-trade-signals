// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	server: {
		port: 9004,
		allowedHosts: [
			"early-trade-signals.com",
			"www.early-trade-signals.com",
			"ku.early-trade-signals.com",
			"ksa.early-trade-signals.com",
			"iq.early-trade-signals.com",
			"su.early-trade-signals.com",

			// TODO:
			"de.localhost:9104",
			"de.localhost:9004"
		],
	},
	preview: {
		allowedHosts: [
			"early-trade-signals.com",
			"www.early-trade-signals.com",
			"ku.early-trade-signals.com",
			"ksa.early-trade-signals.com",
			"iq.early-trade-signals.com",
			"su.early-trade-signals.com",

			// TODO:
			"de.localhost:9104",
			"de.localhost:9004"
		],
	},
})
