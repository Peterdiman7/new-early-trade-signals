// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
	plugins: [vue()],
	build: {
		sourcemap: true
	},
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	server: {
		port: 9004,
		allowedHosts: [
			"https://early-trade-signals.com",
			"https://www.early-trade-signals.com",
			"ku.early-trade-signals.com",
			"ksa.early-trade-signals.com",
			"iq.early-trade-signals.com",
			"su.early-trade-signals.com",
			"de.early-trade-signals.com",
		],
	},
	preview: {
		allowedHosts: [
			"https://early-trade-signals.com",
			"https://www.early-trade-signals.com",
			"ku.early-trade-signals.com",
			"ksa.early-trade-signals.com",
			"iq.early-trade-signals.com",
			"su.early-trade-signals.com",
			"de.early-trade-signals.com",
		],
	},
})
