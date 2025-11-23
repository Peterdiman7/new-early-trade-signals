<template>
    <div>
        <div v-if="subdomain !== 'de'">
            <div v-if="locale === 'de'" v-html="tcGlobalDE"></div>
            <div v-else v-html="tcGlobalEN"></div>
        </div>
        <div v-else>
            <div v-if="locale === 'de'" v-html="tcDE"></div>
            <div v-else v-html="tcEN"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import tcGlobalDE from '@/assets/documents/tcGlobalDE.html?raw'
import tcGlobalEN from '@/assets/documents/tcGlobalEN.html?raw'
import tcDE from '@/assets/documents/tcDE.html?raw'
import tcEN from '@/assets/documents/tcEN.html?raw'

const { locale } = useI18n()

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
