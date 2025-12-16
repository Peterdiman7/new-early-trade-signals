<template>
  <div class="container">
    <div
      v-if="successMessage"
      class="status success"
    >
      {{ successMessage }}
    </div>

    <div
      v-if="errorMessage"
      class="status error"
    >
      {{ errorMessage }}
    </div>

    <div id="widget-container" class="widget-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const successMessage = ref('')
const errorMessage = ref('')
let widgetInstance = null

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
        amount: 0,

        theme: {
          css: {
            '.ps-submit': {
              'background-color': '#000'
            },
            '.ps-submit:hover': {
              'background-color': '#2d2d2d'
            },
            '.ps-submit:disabled': {
              'background-color': '#999'
            }
          }
        },

        customer: {
          email: 'customer@example.com',
          state: 'CA',
          country: 'US'
        },

        fields: [
          {
            label: 'Name',
            placeholder: 'Full Name',
            fieldType: 'name',
            position: 'above',
            size: 'full'
          }
        ],

        currency: 'USD',
        locale: 'en-US',
        buttonText: 'Pay Now'
      },

      onReady: () => {
        console.log('Paysight widget ready')
      },

      onError: (error) => {
        errorMessage.value = error.message || 'Payment error'
      },

      onMessage: (message) => {
        if (message.type === 'PAYMENT_SUCCESS') {
          successMessage.value =
            `Payment successful! Transaction ID: ${message.payload.transactionId}`
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
