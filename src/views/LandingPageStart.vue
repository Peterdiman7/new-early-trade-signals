<template>
	<div class="container">
		<div v-if="successMessage" class="status success">
			{{ successMessage }}
		</div>

		<div v-if="errorMessage" class="status error">
			{{ errorMessage }}
		</div>

		<div id="widget-container" class="widget-container"></div>
	</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

function getEmailFromUrl() {
	const params = new URLSearchParams(window.location.search)
	return params.get('email') || ''
}

const router = useRouter()
const prefilledEmail = getEmailFromUrl()

const successMessage = ref('')
const errorMessage = ref('')
let widgetInstance = null

const API_URL = 'https://back.early-trade-signals.com'

function getClickIdFromCookie() {
	return document.cookie
		.split(';')
		.map(c => c.trim().split('='))
		.find(([name]) => name === 'click_id')?.[1] || null
}

function fireTeleFuturePostback(payout = 1.95) {
	const clickId = getClickIdFromCookie()

	if (!clickId) {
		console.log('[TeleFuture] click_id missing — skip')
		return
	}

	const url =
		'https://futurepay.globway.eu/web/notificationurl/broker:MBX_WW_CC' +
		`?click_id=${encodeURIComponent(clickId)}` +
		`&payout=${encodeURIComponent(payout)}`

	const img = new Image()
	img.src = url

	console.log('[TeleFuture] Postback beacon fired:', url)
}

function loadPaysightSDK() {
	return new Promise((resolve, reject) => {
		if (window.PaySightSDK) return resolve()

		const script = document.createElement('script')
		script.src = 'https://payment.paysight.io/widget-sdk.js'
		script.async = true
		script.onload = resolve
		script.onerror = reject
		document.head.appendChild(script)
	})
}

const customer = prefilledEmail ? { email: prefilledEmail } : undefined

onMounted(async () => {
	try {
		await loadPaysightSDK()

		widgetInstance = window.PaySightSDK.createWidget({
			targetId: 'widget-container',

			config: {
				productId: 9990,
				sessionId: Date.now().toString(),
				environment: 'production',
				amount: 1.95,
				currency: 'USD',
				locale: 'en-US',
				buttonText: 'Complete Payment',
				customer,
				theme: {
					css: {
						'.ps-submit': { backgroundColor: '#22823A' },
						'.ps-submit:hover': { backgroundColor: '#2eb951' },
						'.ps-submit:disabled': { backgroundColor: '#999' }
					}
				},
				fields: [
					{
						label: 'Full Name',
						fieldType: 'name',
						placeholder: 'Enter your full name',
						position: 'above',
						size: 'full',
						required: true
					},
					{
						label: 'Email',
						fieldType: 'email',
						placeholder: 'Enter your email',
						position: 'above',
						size: 'full',
						required: true,
						defaultValue: prefilledEmail
					},
					{
						label: 'Country',
						fieldType: 'country',
						placeholder: 'Select your country',
						position: 'above',
						size: 'full',
						required: true
					}
				]
			},

			onReady: () => {
				console.log('[PaySight] Widget ready')
			},

			onError: error => {
				console.error('[PaySight] Error:', error)
				errorMessage.value = error.message || 'Payment error'
			},

			onMessage: async message => {
				console.log('[PaySight] Message received:', message)

				// Handle payment failure/error cases
				if (message.type !== 'PAYMENT_SUCCESS') {
					console.log('[PaySight] Payment failed — firing test postback')
					errorMessage.value = message.payload?.message || 'Payment failed'
					return
				}

				// Handle successful payment
				if (message.type === 'PAYMENT_SUCCESS') {
					// Check if payload exists
					if (!message.payload) {
						console.error('[PaySight] Payload is null')
						errorMessage.value = 'Invalid payment response'
						return
					}

					const { transactionId, customer } = message.payload
					const email = customer?.email
					const fullName = customer?.name

					if (!email?.trim()) {
						errorMessage.value = 'Missing customer information'
						return
					}

					try {
						const response = await fetch(
							`${API_URL}/auth/register-from-payment`,
							{
								method: 'POST',
								headers: { 'Content-Type': 'application/json' },
								credentials: 'include',
								body: JSON.stringify({ email, transactionId })
							}
						)

						const data = await response.json()

						if (!response.ok) {
							errorMessage.value = data.error || 'Registration failed'
							console.log('Registration failed!')
							return
						}

						fireTeleFuturePostback(1.95)

						successMessage.value =
							'Payment successful! Redirecting to setup password...'

						setTimeout(() => {
							router.push({
								path: '/login',
								query: { email, setup: 'true' }
							})
						}, 2000)

					} catch (err) {
						console.error(err)
						errorMessage.value = 'Network error during registration'
					}
				}
			}
		})

	} catch (err) {
		console.error(err)
		errorMessage.value = 'Failed to load payment widget'
	}
})

onBeforeUnmount(() => {
	widgetInstance?.destroy?.()
})
</script>

<style scoped>
.container {
	max-width: 600px;
	margin: 40px auto;
	padding: 20px;
}

.widget-container {
	border: 1px solid #e5e7eb;
	border-radius: 8px;
	padding: 20px;
}

.status {
	padding: 12px;
	border-radius: 6px;
	margin-bottom: 16px;
}

.error {
	background-color: #fee2e2;
	border: 1px solid #ef4444;
	color: #b91c1c;
}

.success {
	background-color: #dcfce7;
	border: 1px solid #22c55e;
	color: #15803d;
}
</style>