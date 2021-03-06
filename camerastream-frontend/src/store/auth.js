/* global localStorage */
import User from '../models/user.js'
import * as MutationTypes from '@/store/mutation_type'

const state = {
  user: User.from(localStorage.token)
}

const getters = {
  currentUser (state) {
    return state.user
  }
}

const mutations = {
  [MutationTypes.LOGIN] (state) {
    state.user = User.from(localStorage.token)
  },
  [MutationTypes.LOGOUT] (state) {
    state.user = null
  }
}

const actions = {
  login ({ commit }) {
    commit(MutationTypes.LOGIN)
  },

  logout ({ commit }) {
    commit(MutationTypes.LOGOUT)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
