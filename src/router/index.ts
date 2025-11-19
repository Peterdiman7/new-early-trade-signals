import CancelSubscriptionView from "@/views/CancelSubscriptionView.vue"
import ContactView from "@/views/ContactView.vue"
import HomeView from "@/views/HomeView.vue"
import SignalsView from "@/views/SignalsView.vue"
import PricingPlansView from "@/views/PricingPlansView.vue"
import CheckoutView from "@/views/CheckoutView.vue"
import PrivacyPolicyView from "@/views/PrivacyPolicyView.vue"
import TermsAndConditionsView from "@/views/TermsAndConditionsView.vue"
import { createRouter as createVueRouter, createWebHistory } from "vue-router"

import type { RouteLocationNamedRaw } from "vue-router"
import LoginView from "@/views/LoginView.vue"
import RegisterView from "@/views/RegisterView.vue"

export const rootRoute: RouteLocationNamedRaw = { name: "home" }
const createRouter = () => {
	const router = createVueRouter({
		history: createWebHistory(import.meta.env.BASE_URL),
		routes: [
			{
				path: "/",
				name: "home",
				component: HomeView,
			},
			{
				path: "/signals",
				name: "signals",
				component: SignalsView,
			},
			{
				path: "/pricing",
				name: "pricing",
				component: PricingPlansView,
				// meta: { requiresAuth: true },
			},
			{
				path: "/checkout",
				name: "checkout",
				component: CheckoutView,
				// meta: { requiresAuth: true },
			},
			{
				path: "/contact",
				name: "contact",
				component: ContactView,
				// meta: { requiresAuth: true },
			},
			{
				path: "/privacy-policy",
				name: "privacy-policy",
				component: PrivacyPolicyView,
			},
			{
				path: "/terms-conditions",
				name: "terms-conditions",
				component: TermsAndConditionsView,
			},
			{
				path: "/cancel-subscription",
				name: "cancel-subscription",
				component: CancelSubscriptionView,
			},
			{
				path: "/login",
				name: "login",
				component: LoginView,
				meta: { requiresGuest: true },
			},
			{
				path: "/register",
				name: "register",
				component: RegisterView,
				meta: { requiresGuest: true },
			},
		],
	})

	router.beforeEach(async (to, _from, next) => {
		const requiresAuth = to.matched.some(r => (r.meta as any)?.requiresAuth)
		const requiresGuest = to.matched.some(r => (r.meta as any)?.requiresGuest)

		let loggedIn = false
		try {
			const res = await fetch("https://back.early-trade-signals.com/auth/me", {
				credentials: "include"
			})
			loggedIn = res.ok
		} catch (_) { }

		if (requiresAuth && !loggedIn) next({ name: "login" })
		else if (requiresGuest && loggedIn) next({ name: "home" })
		else next()
	})

	return router
}
export default createRouter
