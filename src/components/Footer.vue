<template>
    <footer class="main-footer">
        <div class="widget-section p_relative pt_70 pb_80">
            <div class="auto-container">
                <div class="row clearfix">
                    <div class="col-lg-8 col-md-12 col-sm-12 big-column">
                        <div class="row clearfix">
                            <div class="col-lg-3 col-md-6 col-sm-12 footer-column">
                                <div class="footer-widget links-widget">
                                    <div class="widget-title mb_11">
                                        <h3><a style="color: black;" href="/">{{formatTranslation(t, 'footer.home')}}</a></h3>
                                        <h3><a style="color: black;" href="/signals">{{formatTranslation(t, 'footer.signals')}}</a></h3>
                                        <h3><a style="color: black;" href="/market-analysis">{{formatTranslation(t, 'footer.market_analysis')}}</a></h3>
                                        <h3><a style="color: black;" href="/pricing">{{formatTranslation(t, 'footer.pricing')}}</a></h3>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6 col-sm-12 footer-column">
                                <div class="footer-widget links-widget">
                                    <div class="widget-title mb_11">
                                        <h3>Legal</h3>
                                    </div>
                                    <div class="widget-content">
                                        <ul class="links-list clearfix">
                                            <li><a href="/terms-conditions">{{formatTranslation(t, 'footer.terms_conditions')}}</a></li>
                                            <li><a href="/privacy-policy">{{formatTranslation(t, 'footer.privacy_policy')}}</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6 col-sm-12 footer-column">
                                <div class="footer-widget links-widget">
                                    <div class="widget-title mb_25">
                                        <h3>{{formatTranslation(t, 'footer.support')}}</h3>
                                    </div>
                                    <div class="widget-content">
                                        <ul class="links-list clearfix">
                                            <li><a href="/contact">{{formatTranslation(t, 'footer.contact_us')}}</a></li>
                                            <li><a href="/cancel-subscription">{{formatTranslation(t, 'footer.cancel_subscription')}}</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="footer-lower">
                            <figure class="footer-logo"><a href="/"><img src="/images/logo.png" alt=""></a>
                            </figure>
                            <ul v-if="subdomain !== 'de'" class="footer-card clearfix">
                                <li>
                                    <h4>{{formatTranslation(t, 'footer.we_accept')}}</h4>
                                </li>
                                <li><a href="#"><img src="/images/icons/card-2.png" alt=""></a></li>
                                <li><a href="#"><img src="/images/icons/card-4.png" alt=""></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="auto-container">
                <div class="bottom-inner">
                    <p>Copyright &copy; 2007-2025 <a href="/">Early Trade Signals</a>. All rights reserved.</p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { formatTranslation } from '@/utils/i18'

const subdomain = typeof window !== 'undefined' ? window.location.hostname.split('.')[0] : ''
const { t } = useI18n()
</script>
