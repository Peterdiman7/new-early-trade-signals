<template>
    <div>
        <section class="page-title centred pt_90 pb_0">
            <div class="pattern-layer rotate-me" style="background-image: url(/images/shape/shape-34.png);"></div>
            <div class="auto-container">
                <div class="content-box">
                    <h1>{{ formatTranslation(t, 'cancel_subscription.page_title') }}</h1>
                    <ul class="bread-crumb clearfix">
                        <li><a href="/">{{ formatTranslation(t, 'cancel_subscription.breadcrumb_home') }}</a></li>
                        <li>{{ formatTranslation(t, 'cancel_subscription.breadcrumb_cancel') }}</li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="privacy-section pt_90 pb_100">
            <div class="auto-container">
                <div class="content-box">
                    <h2>{{ formatTranslation(t, 'cancel_subscription.sorry_to_see_you_go') }}</h2>
                    <p>{{ formatTranslation(t, 'cancel_subscription.description') }}</p>

                    <!-- Success Message -->
                    <div v-if="successMessage" class="alert alert-success">
                        <h3>✓ Success!</h3>
                        <p>{{ successMessage }}</p>
                    </div>

                    <!-- Error Message -->
                    <div v-if="errorMessage" class="alert alert-error">
                        <h3>⚠ Error</h3>
                        <p>{{ errorMessage }}</p>
                    </div>

                    <!-- Form -->
                    <form v-if="!successMessage" class="cancel-form" @submit.prevent="submitCancellation">

                        <!-- REASON -->
                        <div class="form-group">
                            <label for="reason">{{ formatTranslation(t, 'cancel_subscription.form.reason_label')
                                }}</label>
                            <select id="reason" v-model="form.reason" required :disabled="isSubmitting">
                                <option disabled value="">
                                    {{ formatTranslation(t, 'cancel_subscription.form.reason_placeholder') }}
                                </option>
                                <option value="too_expensive">
                                    {{ formatTranslation(t, 'cancel_subscription.form.reason_options.too_expensive') }}
                                </option>
                                <option value="not_enough_content">
                                    {{ formatTranslation(t,
                                        'cancel_subscription.form.reason_options.not_enough_content')
                                    }}
                                </option>
                                <option value="better_alternative">
                                    {{ formatTranslation(t,
                                        'cancel_subscription.form.reason_options.better_alternative')
                                    }}
                                </option>
                                <option value="technical_issues">
                                    {{ formatTranslation(t, 'cancel_subscription.form.reason_options.technical_issues')
                                    }}
                                </option>
                                <option value="other">
                                    {{ formatTranslation(t, 'cancel_subscription.form.reason_options.other') }}
                                </option>
                            </select>
                        </div>

                        <!-- FULL NAME -->
                        <div class="form-group">
                            <label for="fullName">{{ formatTranslation(t, 'cancel_subscription.form.full_name_label')
                            }}</label>
                            <input type="text" id="fullName" v-model="form.fullName"
                                :placeholder="formatTranslation(t, 'cancel_subscription.form.full_name_placeholder')"
                                required :disabled="isSubmitting" />
                        </div>

                        <!-- EMAIL -->
                        <div class="form-group">
                            <label for="email">{{ formatTranslation(t, 'cancel_subscription.form.email_label')
                            }}</label>
                            <input type="email" id="email" v-model="form.email"
                                :placeholder="formatTranslation(t, 'cancel_subscription.form.email_placeholder')"
                                required :disabled="isSubmitting" />
                        </div>

                        <!-- COMMENTS -->
                        <div class="form-group">
                            <label for="comments">{{ formatTranslation(t, 'cancel_subscription.form.comments_label')
                            }}</label>
                            <textarea id="comments" v-model="form.comments" rows="4"
                                :placeholder="formatTranslation(t, 'cancel_subscription.form.comments_placeholder')"
                                :disabled="isSubmitting"></textarea>
                        </div>

                        <!-- BUTTON -->
                        <button style="background-color: #22823A;" type="submit" class="theme-btn btn-style-one"
                            :disabled="isSubmitting">
                            <span v-if="!isSubmitting">{{ formatTranslation(t, 'cancel_subscription.form.submit_btn')
                            }}</span>
                            <span v-else>Processing...</span>
                        </button>

                    </form>

                </div>
            </div>
        </section>
    </div>
</template>


<script setup lang="ts">
import { formatTranslation } from '@/utils/i18'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const API_URL = 'https://back.early-trade-signals.com'

const form = ref({
    reason: '',
    fullName: '',
    email: '',
    comments: ''
})

const successMessage = ref('')
const errorMessage = ref('')
const isSubmitting = ref(false)

async function submitCancellation() {
    // Clear previous messages
    successMessage.value = ''
    errorMessage.value = ''
    isSubmitting.value = true

    try {
        const response = await fetch(`${API_URL}/subscription/cancel`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                fullName: form.value.fullName,
                email: form.value.email,
                reason: form.value.reason,
                comments: form.value.comments
            })
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || 'Failed to submit cancellation request')
        }

        successMessage.value = formatTranslation(t, 'cancel_subscription.form.success_message', {
            name: form.value.fullName
        })

        // Reset form
        form.value = { reason: '', fullName: '', email: '', comments: '' }

    } catch (err) {
        console.error('Cancellation error:', err)
        errorMessage.value = err.message || 'An error occurred while submitting your request. Please try again.'
    } finally {
        isSubmitting.value = false
    }
}
</script>

<style scoped>
/* Match other pages */
.content-box h2 {
    font-size: 26px;
    font-weight: 700;
    margin-bottom: 15px;
}

.cancel-form {
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-group label {
    font-weight: 600;
    color: #333;
}

input,
select,
textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid #dcdcdc;
    border-radius: 0.75rem;
    font-size: 1rem;
    transition: 0.2s;
}

input:disabled,
select:disabled,
textarea:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
    opacity: 0.6;
}

input:focus,
select:focus,
textarea:focus {
    border-color: #7453fc;
    box-shadow: 0 0 0 3px rgba(116, 83, 252, 0.15);
    outline: none;
}

.theme-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.alert {
    padding: 1.5rem;
    border-radius: 0.75rem;
    margin-bottom: 1.5rem;
}

.alert h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 1.25rem;
}

.alert-success {
    background-color: #dcfce7;
    border: 1px solid #22c55e;
    color: #15803d;
}

.alert-error {
    background-color: #fee2e2;
    border: 1px solid #ef4444;
    color: #b91c1c;
}
</style>