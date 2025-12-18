<template>
	<Header />
	<div>
		<Preloader />
		<RouterView :key="route.fullPath" />
	</div>
	<Footer />
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { onMounted } from 'vue'

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Preloader from './components/Preloader.vue'
import { useSessionStore } from './stores/session'

const route = useRoute()
const sessionStore = useSessionStore()

onMounted(() => {
	const params = new URLSearchParams(window.location.search)
	const clickId = params.get('click_id')
	const email = params.get('email')

	// Store in session store instead of cookies
	if (clickId) {
		sessionStore.setClickId(clickId)
	}

	if (email) {
		sessionStore.setEmail(email)
	}

	// Also keep cookie functionality for backward compatibility
	if (clickId) {
		document.cookie = `click_id=${clickId}; path=/; max-age=2592000`
	}
	if (email) {
		document.cookie = `email=${email}; path=/; max-age=2592000`
	}
})
</script>

<style scoped></style>