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

                    <form class="cancel-form" @submit.prevent="submitCancellation">

                        <!-- REASON -->
                        <div class="form-group">
                            <label for="reason">{{ formatTranslation(t, 'cancel_subscription.form.reason_label')
                            }}</label>
                            <select id="reason" v-model="form.reason" required>
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
                                required />
                        </div>

                        <!-- EMAIL -->
                        <div class="form-group">
                            <label for="email">{{ formatTranslation(t, 'cancel_subscription.form.email_label')
                                }}</label>
                            <input type="email" id="email" v-model="form.email"
                                :placeholder="formatTranslation(t, 'cancel_subscription.form.email_placeholder')"
                                required />
                        </div>

                        <!-- COMMENTS -->
                        <div class="form-group">
                            <label for="comments">{{ formatTranslation(t, 'cancel_subscription.form.comments_label')
                                }}</label>
                            <textarea id="comments" v-model="form.comments" rows="4"
                                :placeholder="formatTranslation(t, 'cancel_subscription.form.comments_placeholder')"></textarea>
                        </div>

                        <!-- BUTTON -->
                        <button style="background-color: #22823A;" type="submit" class="theme-btn btn-style-one">
                            <span>{{ formatTranslation(t, 'cancel_subscription.form.submit_btn') }}</span>
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

const form = ref({
    reason: '',
    fullName: '',
    email: '',
    comments: ''
})

function submitCancellation() {
    console.log('Cancellation submitted:', form.value)
    alert(`Your cancellation request has been submitted. Thank you, ${form.value.fullName}.`)
    form.value = { reason: '', fullName: '', email: '', comments: '' }
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

input:focus,
select:focus,
textarea:focus {
    border-color: #7453fc;
    box-shadow: 0 0 0 3px rgba(116, 83, 252, 0.15);
    outline: none;
}
</style>
