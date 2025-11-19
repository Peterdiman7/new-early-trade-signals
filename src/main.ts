import { createApp } from "vue"

import { registerPlugins } from "@/plugins"

import App from "./App.vue"

import './assets/css/animate.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/color.css'
import './assets/css/dark.css'
import './assets/css/elpath.css'
import './assets/css/flaticon.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './assets/css/jquery-ui.css'
import './assets/css/jquery.fancybox.min.css'
import './assets/css/nice-select.css'
import './assets/css/odometer.css'
import './assets/css/owl.css'
import './assets/css/responsive.css'
import './assets/css/rtl.css'
import './assets/css/style.css'

import './assets/css/module-css/about.css'
import './assets/css/module-css/account-details.css'
import './assets/css/module-css/account.css'
import './assets/css/module-css/apps.css'
import './assets/css/module-css/award.css'
import './assets/css/module-css/banner.css'
import './assets/css/module-css/blog-details.css'
import './assets/css/module-css/blog-sidebar.css'
import './assets/css/module-css/clients.css'
import './assets/css/module-css/contact.css'
import './assets/css/module-css/cta.css'
import './assets/css/module-css/education-details.css'
import './assets/css/module-css/error.css'
import './assets/css/module-css/experience.css'
import './assets/css/module-css/faq.css'
import './assets/css/module-css/footer.css'
import './assets/css/module-css/funfact.css'
import './assets/css/module-css/header.css'
import './assets/css/module-css/history.css'
import './assets/css/module-css/markets.css'
import './assets/css/module-css/news.css'
import './assets/css/module-css/page-title.css'
import './assets/css/module-css/platform.css'
import './assets/css/module-css/pricing.css'
import './assets/css/module-css/process.css'
import './assets/css/module-css/subscribe.css'
import './assets/css/module-css/team-details.css'
import './assets/css/module-css/team.css'
import './assets/css/module-css/testimonial.css'
import './assets/css/module-css/trading.css'
import './assets/css/module-css/working.css'

const app = createApp(App)

registerPlugins(app).
    then(() => app.mount("#app"))