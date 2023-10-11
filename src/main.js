import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'
import  Vue3Cookies  from "vue3-cookies";
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'jquery';


export default createVuetify({
  defaults: {
    global: {
      ripple: false,
    },
    VSheet: {
      elevation: 4,
    },
  },
})


const vuetify = createVuetify({
  components,
  directives,
})

import 'bootstrap/dist/js/bootstrap.bundle';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const app = createApp(App)
app.use(router)
app.use(vuetify)
app.use(vue3GoogleLogin, {clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID})
app.use(Vue3Cookies, {
    expireTimes: "1d",
    path: '/',
    domain: '',
    secure: true,
    sameSite: 'None'
})

.mount('#app')


