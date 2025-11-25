<template>
    <div v-html="content"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import tcEN from '../assets/documents/tcEN.html?raw'
import tcDE from '../assets/documents/tcDE.html?raw'

const content = computed(() =>
  subdomain === 'de' ? tcDE : tcEN
)

const subdomain = typeof window !== 'undefined' ? window.location.hostname.split('.')[0] : ''
</script>


<style>
.privacy-section .content-box h2 {
    margin-top: 25px;
    margin-bottom: 10px;
    font-size: 26px;
    font-weight: 700;
}

.privacy-section .content-box p,
.privacy-section .content-box ul {
    margin-bottom: 15px;
}
</style>
