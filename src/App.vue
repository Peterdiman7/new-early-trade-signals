<template>
	<Header />
	<div>
		<Preloader />
		<RouterView />
	</div>
	<Footer />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Preloader from './components/Preloader.vue'
</script>


<style scoped></style>