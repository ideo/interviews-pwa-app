/* eslint-disable promise/param-names */
import {LOGIN, SET_CURRENT_MODULE, GET_USERS, GET_USERS_SUCCESS} from '../actions/content'
import axios from 'axios'

const state = {
  isAuth: localStorage.getItem('isAuth') ? parseInt(localStorage.getItem('isAuth')) : 0,
  isUsers: localStorage.getItem('isUsers') ? parseInt(localStorage.getItem('isUsers')) : 1,
  users: {},
  topics: {}
}

const getters = {
  isUsers: state => state.isUsers,
  isAuth: state => state.isAuth
}

const actions = {
  [GET_USERS]: ({commit, dispatch}) => {
    axios.get('/interviews.json')
      .then(response => {
        commit(GET_USERS_SUCCESS, response)
      })
  }
}

const mutations = {
  [LOGIN]: (state, payload) => {
    state.isAuth = payload
    localStorage.setItem('isAuth', payload)
  },
  [SET_CURRENT_MODULE]: (state, payload) => {
    state.isUsers = payload
    localStorage.setItem('isUsers', payload)
  },
  [GET_USERS_SUCCESS]: (state, payload) => {
    state.users = payload.data.data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
