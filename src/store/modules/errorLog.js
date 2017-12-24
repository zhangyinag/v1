import * as types from '../mutation-types'

const state = {
  logs: []
}

const getters = {}

const actions = {
  addErrorLog ({ commit }, log) {
    commit(types.ADD_ERROR_LOG, log)
  }
}

const mutations = {
  [types.ADD_ERROR_LOG]: (state, log) => {
    state.logs.push(log)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
