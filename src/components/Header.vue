<template>
    <div>
        <header class="main-header header-style-one">
            <div class="header-top">
                <div class="large-container">
                    <div class="top-inner">
                        <div class="support-box">
                            <div class="icon-box language-switcher">
                                <img src="/images/en.webp" alt="English" class="flag" @click="setLocale('en')"
                                    :class="{ active: locale === 'en' }" />

                                <img src="/images/de.webp" alt="Deutsch" class="flag" @click="setLocale('de')"
                                    :class="{ active: locale === 'de' }" />
                            </div>

                            <a href="mailto:info@early-trade-signals.com">info@early-trade-signals.com</a>
                        </div>
                        <div v-if="!loggedIn" class="option-block">
                            <a href="/register" class="theme-btn btn-one mr_10">{{
                                formatTranslation(t, 'header.account_open') }}</a>
                            <a href="/login" class="theme-btn btn-two">{{ formatTranslation(t, 'header.login') }}</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="header-lower">
                <div class="large-container">
                    <div class="outer-box">
                        <figure class="logo-box">
                            <a href="/"><img src="/images/logo.png" alt=""></a>
                        </figure>
                        <div class="menu-area">
                            <div class="mobile-nav-toggler" @click="toggleMobileMenu">
                                <i class="icon-bar"></i>
                                <i class="icon-bar"></i>
                                <i class="icon-bar"></i>
                            </div>
                            <nav class="main-menu navbar-expand-md navbar-light clearfix">
                                <div class="collapse navbar-collapse show clearfix" id="navbarSupportedContent">
                                    <ul class="navigation clearfix">
                                        <li><a href="/">{{ formatTranslation(t, 'header.home') }}</a></li>
                                        <li><a href="/signals">{{ formatTranslation(t, 'header.signals') }}</a></li>
                                        <li class="dropdown"><a href="/contact">{{ formatTranslation(t,
                                            'header.support')
                                                }}</a>
                                            <ul>
                                                <li><a href="/contact">{{ formatTranslation(t, 'header.contact_us')
                                                }}</a></li>
                                                <li><a href="/cancel-subscription">{{
                                                    formatTranslation(t, 'header.cancel_subscription') }}</a></li>
                                            </ul>
                                        </li>
                                        <li class="dropdown"><a href="/terms-conditions">{{
                                            formatTranslation(t, 'header.legal') }}</a>
                                            <ul>
                                                <li><a href="/terms-conditions">{{
                                                    formatTranslation(t, 'header.terms_conditions') }}</a></li>
                                                <li><a href="/privacy-policy">{{
                                                    formatTranslation(t, 'header.privacy_policy') }}</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="/market-analysis">{{ formatTranslation(t, 'header.market_analysis')
                                        }}</a></li>
                                        <li><a v-if="subdomain !== 'de'" href="/pricing">{{
                                            formatTranslation(t, 'header.pricing') }}</a></li>
                                        <li v-if="!loggedIn"><a href="/login">{{ formatTranslation(t, 'header.login')
                                        }}</a></li>
                                        <li v-else @click.prevent="handleLogout"><a href="#">{{
                                            formatTranslation(t, 'header.logout') }}</a></li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div class="sticky-header">
                <div class="large-container">
                    <div class="outer-box">
                        <figure class="logo-box">
                            <a href="/"><img src="/images/logo.png" alt=""></a>
                        </figure>
                        <div class="menu-area">
                            <nav class="main-menu clearfix">
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <div class="mobile-menu" :class="{ 'mobile-menu-visible': isMobileMenuOpen }">
            <div class="menu-backdrop" @click="closeMobileMenu"></div>
            <div class="close-btn" @click="closeMobileMenu"><i class="fas fa-times"></i></div>
            <nav class="menu-box">
                <div class="nav-logo">
                    <a href="/"><img src="/images/logo-2.png" alt="" title=""></a>
                </div>
                <div class="menu-outer">
                    <ul class="navigation clearfix">
                        <li><a href="/">{{ formatTranslation(t, 'header.home') }}</a></li>
                        <li><a href="/signals">{{ formatTranslation(t, 'header.signals') }}</a></li>
                        <li class="dropdown" :class="{ 'open': openDropdowns.about }">
                            <a href="javascript:void(0)" @click="toggleDropdown('about')">{{
                                formatTranslation(t, 'header.support') }}</a>
                            <ul>
                                <li><a href="/contact">{{ formatTranslation(t, 'header.contact_us') }}</a></li>
                                <li><a href="/cancel-subscription">{{ formatTranslation(t, 'header.cancel_subscription')
                                }}</a></li>
                            </ul>
                            <div class="dropdown-btn" @click.stop="toggleDropdown('about')">
                                <span class="fas fa-angle-down"></span>
                            </div>
                        </li>
                        <li class="dropdown" :class="{ 'open': openDropdowns.legal }">
                            <a href="javascript:void(0)" @click="toggleDropdown('legal')">{{ formatTranslation(t,
                                'header.legal') }}</a>
                            <ul>
                                <li><a href="/terms-conditions">{{ formatTranslation(t, 'header.terms_conditions')
                                }}</a>
                                </li>
                                <li><a href="/privacy-policy">{{ formatTranslation(t, 'header.privacy_policy') }}</a>
                                </li>
                            </ul>
                            <div class="dropdown-btn" @click.stop="toggleDropdown('legal')">
                                <span class="fas fa-angle-down"></span>
                            </div>
                        </li>
                        <li><a href="/market-analysis">{{ formatTranslation(t, 'header.market_analysis') }}</a></li>
                        <li><a v-if="subdomain !== 'de'" href="/pricing">{{ formatTranslation(t, 'header.pricing')
                                }}</a>
                        </li>
                        <li v-if="!loggedIn"><a href="/login">{{ formatTranslation(t, 'header.login') }}</a></li>
                        <li v-else @click.prevent="handleLogout"><a href="#">{{ formatTranslation(t, 'header.logout')
                        }}</a></li>
                    </ul>
                </div>
                <div class="contact-info">
                    <h4>{{ formatTranslation(t, 'header.contact_info') }}</h4>
                    <ul v-if="subdomain !== 'de'">
                        <li>1125 E BROADWAY BLVD #14, GLENDALE, CA 91205</li>
                        <li><a href="tel:+1-747-250-0014">+1-747-250-0014</a></li>
                        <li>Pulse Entertainment Services LTD</li>
                        <li><a href="mailto:info@example.com">info@early-trade-signals.com</a></li>
                    </ul>
                    <ul v-else>
                        <li> Pimen Zogravski Nr. 14, 1000 Sofia, Bulgaria</li>
                        <li><a href="tel:0800 589 5405">0800 589 5405</a></li>
                        <li>MBX Productive Ltd.</li>
                        <span><strong>Umsatzsteuer-Identifikationsnummer:</strong> BG206562674</span>
                        <li><a href="mailto:ets.de@silverlines.info"><strong>E-Mail:</strong> ets.de@silverlines.info</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, onBeforeMount } from 'vue'

import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { storeToRefs } from 'pinia'

import { useAuthStore } from '@/stores/auth'
import { formatTranslation } from '@/utils/i18'
import { useGlobalStore } from '@/stores/GlobalStore'

const { t } = useI18n()
const router = useRouter()
const auth = useAuthStore()
const { loggedIn } = storeToRefs(auth)
const i18n = useI18n()
const { locale } = storeToRefs(useGlobalStore())
const { setLocale } = useGlobalStore()

const isMobileMenuOpen = ref(false)
const openDropdowns = ref({
    about: false,
    legal: false,
})

const subdomain = typeof window !== 'undefined' ? window.location.hostname.split('.')[0] : ''

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
    isMobileMenuOpen.value = false
    openDropdowns.value = {
        about: false,
        legal: false,
    }
}

const toggleDropdown = (name: string) => {
    openDropdowns.value[name] = !openDropdowns.value[name]
}

watch(isMobileMenuOpen, (isOpen) => {
    if (isOpen) {
        document.body.classList.add('mobile-menu-visible')
    } else {
        document.body.classList.remove('mobile-menu-visible')
    }
})

const logout = async () => {
    await auth.logout()
    router.push("/")
}

const handleLogout = async () => {
    await logout()
}

onBeforeMount(() => {
    i18n.locale.value = locale.value
})

onMounted(() => {
    auth.checkLogin()
})

onUnmounted(() => {
    document.body.classList.remove('mobile-menu-visible')
})
</script>

<style scoped>
.mobile-menu {
    transition: all 900ms ease;
}

@media (max-width: 1200px) {
    .menu-area .mobile-nav-toggler {
        display: block;
        background: var(--theme-color);
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
    }

    .main-menu .navbar-collapse {
        display: none !important;
    }
}

.mobile-menu-visible {
    opacity: 1 !important;
    visibility: visible !important;
}

.mobile-menu-visible .menu-backdrop {
    opacity: 0.70;
    visibility: visible;
}

.mobile-menu-visible .menu-box {
    opacity: 1;
    visibility: visible;
    transform: translateX(0%);
}

/* Dropdown styles */
.mobile-menu .navigation li.dropdown>ul {
    display: none;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
}

.mobile-menu .navigation li.dropdown.open>ul {
    display: block;
    max-height: 500px;
}

.dropdown-btn {
    cursor: pointer;
    transition: transform 0.3s ease;
}

.dropdown.open .dropdown-btn {
    transform: rotate(180deg);
}

.language-switcher {
    display: flex;
    align-items: center;
    gap: 8px;
}

.flag {
    width: 26px;
    height: 18px;
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.flag:hover {
    opacity: 1;
    transform: scale(1.1);
}

.flag.active {
    opacity: 1;
}
</style>
