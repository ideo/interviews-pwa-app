/* eslint-disable promise/param-names */
import {GET_USERS, GET_USERS_SUCCESS, GET_TOPICS, GET_TOPICS_SUCCESS} from '../actions/content'
import axios from 'axios'

const state = {
  users: {},
  topics: {}
}

const getters = {}

const actions = {
  [GET_USERS]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      axios.get('/people.json')
        .then(response => {
          commit(GET_USERS_SUCCESS, response)
          resolve(response)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  },
  [GET_TOPICS]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      axios.get('/themes.json')
        .then(response => {
          commit(GET_TOPICS_SUCCESS, response)
          resolve(response)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  }
}

const mutations = {
  [GET_USERS_SUCCESS]: (state, payload) => {
    state.users = payload.data.data
  },
  [GET_TOPICS_SUCCESS]: (state, payload) => {
    state.topics = payload.data.data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
