import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'

import auth from './modules/auth'
import permission from './modules/permission'
import menu from './modules/menu'
import errorLog from './modules/errorLog'

Vue.use(Vuex)

export default new Vuex.Store({
  // actions,
  getters,
  modules: {
    auth,
    permission,
    menu,
    errorLog
  }
})
