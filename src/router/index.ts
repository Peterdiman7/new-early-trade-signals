import CancelSubscriptionView from "@/views/CancelSubscriptionView.vue"
import ContactView from "@/views/ContactView.vue"
import HomeView from "@/views/HomeView.vue"
import SignalsView from "@/views/SignalsView.vue"
import MarketAnalysisView from "@/views/MarketAnalysisView.vue"
import PricingPlansView from "@/views/PricingPlansView.vue"
import CheckoutView from "@/views/CheckoutView.vue"
import PrivacyPolicyView from "@/views/PrivacyPolicyView.vue"
import LandingPageStart from "@/views/LandingPageStart.vue"
import TermsAndConditionsView from "@/views/TermsAndConditionsView.vue"
import { createRouter as createVueRouter, createWebHistory } from "vue-router"

import type { RouteLocationNamedRaw } from "vue-router"
import LoginView from "@/views/LoginView.vue"
import RegisterView from "@/views/RegisterView.vue"

import { useAuthStore } from "@/stores/auth"

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
				meta: { requiresAuth: true, requiresSubscription: true },
			},
			{
				path: "/pricing",
				name: "pricing",
				component: PricingPlansView,
				meta: { requiresAuth: true, requiresNotGermany: true },
			},
			{
				path: "/market-analysis",
				name: "market-analysis",
				component: MarketAnalysisView,
				meta: { requiresAuth: true, requiresSubscription: true },
			},
			{
				path: "/checkout",
				name: "checkout",
				component: CheckoutView,
				meta: { requiresAuth: true },
			},
			{
				path: "/contact",
				name: "contact",
				component: ContactView,
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
				meta: { requiresGuest: true, requiresNotGermany: true },
			},
			{
				path: "/lpstart",
				name: "lpstart",
				component: LandingPageStart,
				meta: { requresGuest: true }
			},
		],
	})


	router.beforeEach(async (to, _from, next) => {
		const requiresAuth = to.matched.some(r => (r.meta as any)?.requiresAuth)
		const requiresGuest = to.matched.some(r => (r.meta as any)?.requiresGuest)
		const requiresNotGermany = to.matched.some(r => (r.meta as any)?.requiresNotGermany)
		const requiresSubscription = to.matched.some(r => (r.meta as any)?.requiresSubscription)

		const subdomain = typeof window !== 'undefined' ? window.location.hostname.split('.')[0] : ''
		const isGermany = subdomain === 'de'

		const authStore = useAuthStore()
		await authStore.checkLogin()

		const loggedIn = authStore.loggedIn
		const subscriptionActive = authStore.subscriptionActive

		if (requiresAuth && !loggedIn) {
			next({ path: "/login" })
		}
		else if (requiresSubscription && !subscriptionActive) {
			if (isGermany) next({ path: "/" })
			else next({ path: "/pricing" })
		}
		else if (requiresNotGermany && isGermany) {
			next({ path: "/" })
		}
		else if (requiresGuest && loggedIn) {
			next({ path: "/" })
		}
		else {
			next()
		}
	})

	return router
}
export default createRouter
