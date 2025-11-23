<template>
    <div>
        <section class="page-title centred pt_90 pb_0">
            <div class="pattern-layer rotate-me" style="background-image: url(/images/shape/shape-34.png);"></div>
            <div class="auto-container">
                <div class="content-box">
                    <h1>{{ formatTranslation(t, 'header.contact_us') }}</h1>
                    <ul class="bread-crumb clearfix">
                        <li><a href="/">Home</a></li>
                        <li>{{ formatTranslation(t, 'header.contact_us') }}</li>
                    </ul>
                </div>
            </div>
        </section>
        <section class="contact-section pt_90 pb_100">
            <div class="auto-container">
                <div class="info-inner pb_25">
                    <div v-if="subdomain !== 'de'" class="row clearfix">
                        <div class="col-lg-3 col-md-6 col-sm-12 info-column">
                            <div class="single-info">
                                <div class="icon-box"><i class="icon-45"></i></div>
                                <h4>{{ formatTranslation(t, 'header.contact_us') }}</h4>
                                <p>Pulse Entertainment Services LTD</p>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-12 info-column">
                            <div class="single-info">
                                <div class="icon-box"><i class="icon-45"></i></div>
                                <h4>{{ formatTranslation(t, 'contacts.main_warehouse') }}</h4>
                                <p>1125 E BROADWAY BLVD #14, GLENDALE, CA 91205</p>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-12 info-column">
                            <div class="single-info">
                                <div class="icon-box"><i class="icon-46"></i></div>
                                <h4>Email Address</h4>
                                <p><a href="mailto:info@early-trade-signals.com">info@early-trade-signals.com</a><a
                                        href="mailto:help@early-trade-signals.com">help@early-trade-signals.com</a></p>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-12 info-column">
                            <div class="single-info">
                                <div class="icon-box"><i class="icon-47"></i></div>
                                <h4>Phone Number</h4>
                                <p><a href="tel:+1-747-250-0014">+1-747-250-0014</a></p>
                            </div>
                        </div>
                    </div>
                    <div v-else class="row clearfix">
                        <div class="col-lg-3 col-md-6 col-sm-12 info-column">
                            <div class="single-info">
                                <div class="icon-box"><i class="icon-45"></i></div>
                                <h4>{{ formatTranslation(t, 'contacts.corporate_office') }}</h4>
                                <p>MBX Productive ltd.</p>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-12 info-column">
                            <div class="single-info">
                                <div class="icon-box"><i class="icon-45"></i></div>
                                <h4>{{ formatTranslation(t, 'contacts.main_warehouse') }}</h4>
                                <p> Pimen Zogravski Nr. 14, 1000 Sofia, Bulgaria</p>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-12 info-column">
                            <div class="single-info">
                                <div class="icon-box"><i class="icon-46"></i></div>
                                <h4>Email Address</h4>
                                <li><strong>E-Mail:</strong> ets.de@silverlines.info</li>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-12 info-column">
                            <div class="single-info">
                                <div class="icon-box"><i class="icon-47"></i></div>
                                <h4>{{ formatTranslation(t, 'contacts.phone') }}</h4>
                                <p><a href="tel:0800 589 5405">0800 589 5405</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-inner pb_70">
                    <form method="post" action="sendemail.php" id="contact-form">
                        <div class="row clearfix">
                            <div class="col-lg-6 col-md-6 col-sm-12 form-group">
                                <label>{{ formatTranslation(t, 'contacts.your_name') }}<span>*</span></label>
                                <input type="text" name="username" placeholder="" required>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12 form-group">
                                <label>{{ formatTranslation(t, 'contacts.phone') }}<span>*</span></label>
                                <input type="text" name="phone" placeholder="" required>
                            </div>
                            <div class="col-lg-12 col-md-12 col-sm-12 form-group">
                                <label>{{ formatTranslation(t, 'contacts.email_address') }}<span>*</span></label>
                                <input type="email" name="email" placeholder="" required>
                            </div>
                            <div class="col-lg-12 col-md-12 col-sm-12 form-group">
                                <label>Subject <span>*</span></label>
                                <input type="text" name="subject" placeholder="" required>
                            </div>
                            <div class="col-lg-12 col-md-12 col-sm-12 form-group">
                                <label>{{ formatTranslation(t, 'contacts.write_message') }}<span>*</span></label>
                                <textarea name="message" placeholder=""></textarea>
                            </div>
                            <div class="col-lg-12 col-md-12 col-sm-12 form-group message-btn pt_18">
                                <button type="submit" class="theme-btn btn-one" name="submit-form">{{
                                    formatTranslation(t, 'contacts.write_message') }}</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="map-inner">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3302.440786394572!2d-118.25654882356894!3d34.1447173159918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c0eb1ce7d2c3%3A0x3e61df4ef0a1d2b2!2s1125%20E%20Broadway%20%2314%2C%20Glendale%2C%20CA%2091205%2C%20USA!5e0!3m2!1sen!2sus!4v1731800000000"
                        width="100%" height="500" style="border:0;" allowfullscreen="" loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>
        </section>
        <section class="subscribe-section">
            <div class="bg-color"></div>
            <div class="auto-container">
                <div class="inner-container">
                    <div class="shape" style="background-image: url(/images/shape/shape-5.png);"></div>
                    <div class="row align-items-center">
                        <div class="col-lg-6 col-md-12 col-sm-12 text-column">
                            <div class="text-box">
                                <h2>{{ formatTranslation(t, 'home.subscribe_latest_news') }}</h2>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-12 col-sm-12 form-column">
                            <div class="form-inner">
                                <form method="post" action="/contact">
                                    <div class="form-group">
                                        <input type="email" name="email" placeholder="Email Address" required>
                                        <button type="submit" class="theme-btn btn-one">{{ formatTranslation(t,
                                            'home.subscribe') }}<i class="icon-26"></i></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <footer class="main-footer">
            <div class="footer-bottom">
                <div class="auto-container">
                    <div class="bottom-inner">
                        <p>Copyright &copy; 2007-2025 <a href="/">Early Trade Signals</a>. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
import { formatTranslation } from '@/utils/i18'

import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const subdomain = typeof window !== 'undefined' ? window.location.hostname.split('.')[0] : ''
</script>

<style scoped></style>
