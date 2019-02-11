import Vue from 'vue'
import {store} from './store/store'
import axios from 'axios'
import App from './App'
// Styles
import './scss/app.scss'
// Video Player
// https://www.npmjs.com/package/vue-video-player
import VueVideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
// Lazyload
import LazySizes from 'lazysizes'
// Video Player
Vue.use(VueVideoPlayer)
// Lazyload
Vue.use(LazySizes)

// Global Event Bus
Vue.prototype.$eventHub = new Vue()

Vue.config.productionTip = false

axios.defaults.baseURL = process.env.AXIOS_BASE_URL

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})
