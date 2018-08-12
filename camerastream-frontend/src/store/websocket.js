/* global localStorage */
import * as MutationTypes from '@/store/mutation_type'

const state = {
  socket: {
    isConnected: false,
    message: '',
    reconnectError: false
  }
}

const mutations = {
  [MutationTypes.SOCKET_ONOPEN] (state, event) {
    state.socket.isConnected = true
  },
  [MutationTypes.SOCKET_ONCLOSE] (state, event) {
    state.socket.isConnected = false
  },
  [MutationTypes.SOCKET_ONERROR] (state, event) {
    console.error(state, event)
  },
  // default handler called for all methods
  [MutationTypes.SOCKET_ONMESSAGE] (state, message) {
    state.socket.message = message
  },
  // mutations for reconnect methods
  [MutationTypes.SOCKET_RECONNECT] (state, count) {
    console.info(state, count)
  },
  [MutationTypes.SOCKET_RECONNECT_ERROR] (state) {
    state.socket.reconnectError = true
  }
}

export default {
  state,
  mutations
}
