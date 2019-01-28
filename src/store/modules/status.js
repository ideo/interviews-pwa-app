/* eslint-disable promise/param-names */
import {CLOSE_SHARE_SCREEN, LOGIN, OPEN_SHARE_SCREEN, SET_CURRENT_MODULE, TOGGLE_MOBILE_MENU} from '../actions/status'

const state = {
  isAuth: localStorage.getItem('isAuth') ? parseInt(localStorage.getItem('isAuth')) : 0,
  isUsers: localStorage.getItem('isUsers') ? parseInt(localStorage.getItem('isUsers')) : 1,
  isLoading: false,
  isShare: false,
  isMobileMenuOpened: false
}

const getters = {
  isUsers: state => state.isUsers,
  isAuth: state => state.isAuth,
  isLoading: state => state.isLoading,
  isShare: state => state.isShare,
  isMobileMenuOpened: state => state.isMobileMenuOpened
}

const actions = {}

const mutations = {
  [LOGIN]: (state, payload) => {
    state.isLoading = true
    state.isAuth = payload
    localStorage.setItem('isAuth', payload)
    setTimeout(() => {
      state.isLoading = false
    }, 500)
  },
  [SET_CURRENT_MODULE]: (state, payload) => {
    state.isUsers = payload
    localStorage.setItem('isUsers', payload)
  },
  [OPEN_SHARE_SCREEN]: (state) => {
    state.isShare = true
  },
  [CLOSE_SHARE_SCREEN]: (state) => {
    state.isShare = false
  },
  [TOGGLE_MOBILE_MENU]: (state, payload) => {
    state.isMobileMenuOpened = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
