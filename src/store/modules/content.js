/* eslint-disable promise/param-names */
import {GET_USERS, GET_USERS_SUCCESS} from '../actions/content'
import axios from 'axios'

const state = {
  users: {},
  topics: {}
}

const getters = {}

const actions = {
  [GET_USERS]: ({commit, dispatch}) => {
    axios.get('/people.json')
      .then(response => {
        commit(GET_USERS_SUCCESS, response)
      })
  }
}

const mutations = {
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
