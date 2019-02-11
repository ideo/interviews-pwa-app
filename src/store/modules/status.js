/* eslint-disable promise/param-names */
import {LOGIN, SET_CURRENT_MODULE, TOGGLE_MOBILE_MENU} from '../actions/status'

const state = {
  isAuth: localStorage.getItem('isAuth') ? parseInt(localStorage.getItem('isAuth')) : 0,
  isUsers: localStorage.getItem('isUsers') ? parseInt(localStorage.getItem('isUsers')) : 1,
  isLoading: false,
  isMobileMenuOpened: false
}

const mutations = {
  [LOGIN]: (state, payload) => {
    state.isLoading = true
    state.isAuth = payload
    localStorage.setItem('isAuth', payload)

    // Hide loading
    setTimeout(() => {
      state.isLoading = false
    }, 500)
  },
  [SET_CURRENT_MODULE]: (state, payload) => {
    state.isUsers = payload
    localStorage.setItem('isUsers', payload)
  },
  [TOGGLE_MOBILE_MENU]: (state, payload) => {
    if (payload === false) {
      // Prevent card scroll on Android
      setTimeout(() => {
        state.isMobileMenuOpened = payload
      }, 100)
    } else {
      state.isMobileMenuOpened = payload
    }
  }
}

export default {
  state,
  mutations
}
