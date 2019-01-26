import Vue from 'vue'
import App from './App'
import router from './router'
import './scss/app.scss'
import {store} from './store/store'
import axios from 'axios'

Vue.config.productionTip = false

axios.defaults.baseURL = process.env.AXIOS_BASE_URL

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
