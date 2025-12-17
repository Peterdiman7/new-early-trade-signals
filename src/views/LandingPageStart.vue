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

const router = useRouter()
const successMessage = ref('')
const errorMessage = ref('')
let widgetInstance = null

const API_URL = 'https://back.early-trade-signals.com'

function loadPaysightSDK() {
  return new Promise((resolve, reject) => {
    if (window.PaySightSDK) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = 'https://payment.paysight.io/widget-sdk.js'
    script.async = true
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}

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

        theme: {
          css: {
            '.ps-submit': {
              'background-color': '#22823A'
            },
            '.ps-submit:hover': {
              'background-color': '#2eb951'
            },
            '.ps-submit:disabled': {
              'background-color': '#999'
            }
          }
        },

        customer: {
          email: '',
          state: '',
          country: ''
        },

        fields: [
          {
            label: 'Full Name',
            placeholder: 'Enter your full name',
            fieldType: 'name',
            position: 'above',
            size: 'full'
          },
          {
            label: 'Email',
            placeholder: 'Enter your email',
            fieldType: 'email',
            position: 'above',
            size: 'full'
          }
        ],

        currency: 'USD',
        locale: 'en-US',
        buttonText: 'Complete Payment'
      },

      onReady: () => {
        console.log('Paysight widget ready')
      },

      onError: (error) => {
        errorMessage.value = error.message || 'Payment error'
      },

      onMessage: async (message) => {
        if (message.type === 'PAYMENT_SUCCESS') {
          const transactionId = message.payload.transactionId
          const customerData = message.payload.customer

          // Extract email and name from payment data
          const email = customerData?.email || ''
          const fullName = customerData?.name || ''

          if (!email || !fullName) {
            errorMessage.value = 'Missing customer information'
            return
          }

          // Create account without password
          try {
            const response = await fetch(`${API_URL}/auth/register-from-payment`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify({
                email,
                transactionId
              })
            })

            const data = await response.json()

            if (!response.ok) {
              errorMessage.value = data.error || 'Registration failed'
              return
            }

            successMessage.value = 'Payment successful! Redirecting to setup password...'

            // Redirect to login with email pre-filled
            setTimeout(() => {
              router.push({
                path: '/login',
                query: { email, setup: 'true' }
              })
            }, 2000)

          } catch (err) {
            errorMessage.value = 'Network error during registration'
            console.error(err)
          }
        }

        if (message.type === 'PAYMENT_ERROR') {
          errorMessage.value = message.payload.message
        }
      }
    })
  } catch (err) {
    errorMessage.value = 'Failed to load payment widget'
    console.error(err)
  }
})

onBeforeUnmount(() => {
  if (widgetInstance?.destroy) {
    widgetInstance.destroy()
  }
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