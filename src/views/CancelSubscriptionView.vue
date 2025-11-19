<template>
    <div>
        <!-- Page Title -->
        <section class="page-title centred pt_90 pb_0">
            <div class="pattern-layer rotate-me" style="background-image: url(/images/shape/shape-34.png);"></div>
            <div class="auto-container">
                <div class="content-box">
                    <h1>Cancel Subscription</h1>
                    <ul class="bread-crumb clearfix">
                        <li><a href="/">Home</a></li>
                        <li>Cancel Subscription</li>
                    </ul>
                </div>
            </div>
        </section>

        <!-- Cancellation Section -->
        <section class="privacy-section pt_90 pb_100">
            <div class="auto-container">
                <div class="content-box">

                    <h2>We're Sorry to See You Go</h2>
                    <p>Please fill out the form below to confirm your subscription cancellation.</p>

                    <form class="cancel-form" @submit.prevent="submitCancellation">

                        <div class="form-group">
                            <label for="reason">Reason for cancellation</label>
                            <select id="reason" v-model="form.reason" required>
                                <option disabled value="">-- Select a reason --</option>
                                <option>Too expensive</option>
                                <option>Not enough content</option>
                                <option>Found a better alternative</option>
                                <option>Technical issues</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="fullName">Full name</label>
                            <input type="text" id="fullName" v-model="form.fullName" placeholder="Enter your full name"
                                required />
                        </div>

                        <div class="form-group">
                            <label for="email">Email address</label>
                            <input type="email" id="email" v-model="form.email" placeholder="Enter your email"
                                required />
                        </div>

                        <div class="form-group">
                            <label for="comments">Additional comments (optional)</label>
                            <textarea id="comments" v-model="form.comments" rows="4"
                                placeholder="Tell us more..."></textarea>
                        </div>

                        <button style="background-color: #22823A;" type="submit" class="theme-btn btn-style-one">
                            <span>Submit & Cancel</span>
                        </button>

                    </form>

                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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
