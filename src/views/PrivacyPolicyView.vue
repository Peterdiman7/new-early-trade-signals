<template>
    <div>
        <div v-if="subdomain !== 'de'">
            <div v-if="locale === 'de'" v-html="privacyGlobalDE"></div>
            <div v-else v-html="privacyGlobalEN"></div>
        </div>
        <div v-else>
            <div v-if="locale === 'de'" v-html="privacyDE"></div>
            <div v-else v-html="privacyEN"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import privacyDE from '@/assets/documents/privacyPolicyDE.html?raw'
import privacyEN from '@/assets/documents/privacyPolicyEN.html?raw'
import privacyGlobalDE from '@/assets/documents/privacyPolicyGlobalDE.html?raw'
import privacyGlobalEN from '@/assets/documents/privacyPolicyGlobalEN.html?raw'

const { locale } = useI18n()

const subdomain =
    typeof window !== 'undefined' ? window.location.hostname.split('.')[0] : ''
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
