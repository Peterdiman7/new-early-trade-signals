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

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Preloader from './components/Preloader.vue'

const route = useRoute()
</script>


<style scoped></style>
