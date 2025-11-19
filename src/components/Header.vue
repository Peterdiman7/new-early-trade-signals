<template>
    <div>
        <header class="main-header header-style-one">
            <div class="header-top">
                <div class="large-container">
                    <div class="top-inner">
                        <div class="support-box">
                            <div class="icon-box"><i class="icon-07"></i></div>
                            <a href="mailto:info@early-trade-signals.com">info@early-trade-signals.com</a>
                        </div>
                        <div v-if="!loggedIn" class="option-block">
                            <a href="/register" class="theme-btn btn-one mr_10">Open Account</a>
                            <a href="/login" class="theme-btn btn-two">Login</a>
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
                                        <li><a href="/">Home</a></li>
                                        <li><a href="/signals">Signals</a></li>
                                        <li class="dropdown"><a href="/contact">Support</a>
                                            <ul>
                                                <li><a href="/contact">Contact Us</a></li>
                                                <li><a href="/cancel-subscription">Cancel Subscription</a></li>
                                            </ul>
                                        </li>
                                        <li class="dropdown"><a href="/terms-conditions">Legal</a>
                                            <ul>
                                                <li><a href="/terms-conditions">Terms & Conditions</a></li>
                                                <li><a href="/privacy-policy">Privacy Policy</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="/market-analysis">Market Analysis</a></li>
                                        <li><a v-if="subdomain !== 'de'" href="/pricing">Pricing</a></li>
                                        <li v-if="!loggedIn"><a href="/login">Login</a></li>
                                        <li v-else @click.prevent="handleLogout"><a href="#">Logout</a></li>
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
                    <a href="index.html"><img src="/images/logo-2.png" alt="" title=""></a>
                </div>
                <div class="menu-outer">
                    <ul class="navigation clearfix">
                        <li><a href="/">Home</a></li>
                        <li><a href="/signals">Signals</a></li>
                        <li class="dropdown" :class="{ 'open': openDropdowns.about }">
                            <a href="javascript:void(0)" @click="toggleDropdown('about')">Support</a>
                            <ul>
                                <li><a href="/contact">Contact Us</a></li>
                                <li><a href="/cancel-subscription">Cancel Subscription</a></li>
                            </ul>
                            <div class="dropdown-btn" @click.stop="toggleDropdown('about')">
                                <span class="fas fa-angle-down"></span>
                            </div>
                        </li>
                        <li class="dropdown" :class="{ 'open': openDropdowns.legal }">
                            <a href="javascript:void(0)" @click="toggleDropdown('legal')">Legal</a>
                            <ul>
                                <li><a href="/terms-conditions">Terms & Conditions</a></li>
                                <li><a href="/privacy-policy">Privacy Policy</a></li>
                            </ul>
                            <div class="dropdown-btn" @click.stop="toggleDropdown('legal')">
                                <span class="fas fa-angle-down"></span>
                            </div>
                        </li>
                        <li><a href="/market-analysis">Market Analysis</a></li>
                        <li><a v-if="subdomain !== 'de'" href="/pricing">Pricing</a></li>
                        <li v-if="!loggedIn"><a href="/login">Login</a></li>
                        <li v-else @click.prevent="handleLogout"><a href="#">Logout</a></li>
                    </ul>
                </div>
                <div class="contact-info">
                    <h4>Contact Info</h4>
                    <ul>
                        <li>1125 E BROADWAY BLVD #14, GLENDALE, CA 91205</li>
                        <li><a href="tel:+8801682648101">+1-747-250-0014</a></li>
                        <li>Pulse Entertainment Services LTD</li>
                        <li><a href="mailto:info@example.com">info@early-trade-signals.com</a></li>
                    </ul>
                </div>
                <div class="social-links">
                    <ul class="clearfix">
                        <li><a href="#"><span class="fab fa-twitter"></span></a></li>
                        <li><a href="#"><span class="fab fa-facebook-square"></span></a></li>
                        <li><a href="#"><span class="fab fa-pinterest-p"></span></a></li>
                        <li><a href="#"><span class="fab fa-instagram"></span></a></li>
                        <li><a href="#"><span class="fab fa-youtube"></span></a></li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

import { useRouter } from 'vue-router'

import { storeToRefs } from 'pinia'

import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()
const { loggedIn } = storeToRefs(auth)

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
</style>