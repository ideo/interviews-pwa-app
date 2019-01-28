import Vue from 'vue'
import App from './App'
import './scss/app.scss'
import {store} from './store/store'
import axios from 'axios'
import PlayButton from './components/PlayButton'

Vue.config.productionTip = false

axios.defaults.baseURL = process.env.AXIOS_BASE_URL

Vue.component('PlayButton', PlayButton)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})
