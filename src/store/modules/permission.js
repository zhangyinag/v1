import * as types from '../mutation-types'

/*
* permissionMap:
*   键名： 系统名/类型名/模块名/子模块/.../标识符
*   值：access：true/false
*      strategy: 'affirmed'/'denied'/inherit  //对其子模块没有匹配到的permission采用的策略：全部通过/全部拒绝/与父级相同
*
* */

export const state = {
  permissionMap: {}
}

export const getters = {
  hasPermission: (state) => name => {
    if (!name) return false
    if (state.permissionMap[name]) return state.permissionMap[name].access
    let existParent = getExistParent(name)
    if (!existParent) return false
    if (existParent.strategy === 'affirmed') return true
    if (existParent.strategy === 'denied') return false
    if (existParent.strategy === 'inherit') return existParent.access

    function getExistParent (name) {
      if (!name) return null
      let parentName = name.split('.').slice(0, -1).join('.')
      if (!parentName) return null
      if (state.permissionMap[parentName]) return state.permissionMap[parentName]
      return getExistParent(parentName)
    }
  }
}

const actions = {}

const mutations = {
  [types.SET_PERMISSION]: (state, permissionMap) => {
    state.permissionMap = permissionMap
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
