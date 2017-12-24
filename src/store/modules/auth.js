import * as types from '../mutation-types'

const state = {
  empUm: '',
  empName: '',
  // roles: [],
  platform: '', // 当前系统 'tmr'/'admin'
  authenticated: false // 仅有此属性判断用户是否验证过
}

const getters = {}

const actions = {}

const mutations = {
  [types.SET_AUTH]: (state, auth) => {
    state.empUm = auth.empUm
    state.empName = auth.empName
    // state.roles = auth.roles || []
    state.platform = auth.platform || state.platform
    state.authenticated = auth.authenticated !== undefined ? !!state.authenticated : state.authenticated
  },
  [types.SET_PLATFORM]: (state, platform) => {
    state.platform = platform
  },
  [types.SET_AUTHENTICATED]: (state, authenticated) => {
    state.authenticated = !!authenticated
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
