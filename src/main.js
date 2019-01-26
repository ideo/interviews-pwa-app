import Vue from 'vue'
import App from './App'
import router from './router'
import './scss/app.scss'
import {store} from './store/store'
import axios from 'axios'

Vue.config.productionTip = false

axios.defaults.baseURL = 'https://dev-craft3-8f0d48babb4d.hyperlane.co'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
