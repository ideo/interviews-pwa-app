import Vue from 'vue'
import Vuex from 'vuex'
import status from './modules/status'
import content from './modules/content'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    status,
    content
  }
})
