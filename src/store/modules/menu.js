import * as types from '../mutation-types'

const tmrMenus = [
  {
    permissionKey: 'tmr.menu.nav1',
    menuName: '导航1',
    menuClass: 'el-icon-location',
    seq: 1,
    link: null,
    children: [
      {
        permissionKey: 'tmr.menu.nav1.grp1',
        menuName: '分组一',
        menuClass: 'el-icon-location',
        seq: 1,
        link: null,
        children: [
          {
            permissionKey: 'tmr.menu.nav1.grp1.item1',
            menuName: '选项一',
            menuClass: 'el-icon-location',
            seq: 1,
            link: '/nav1/grp1/item1'
          },
          {
            permissionKey: 'tmr.menu.nav1.grp1.item2',
            menuName: '选项二',
            menuClass: 'el-icon-location',
            seq: 1,
            link: '/nav1/grp1/item2'
          }]
      },
      {
        permissionKey: 'tmr.menu.nav1.grp2',
        menuName: '分组二',
        menuClass: 'el-icon-location',
        seq: 2,
        link: null,
        children: [
          {
            permissionKey: 'tmr.menu.nav1.grp2.item1',
            menuName: '选项一',
            menuClass: 'el-icon-location',
            seq: 1,
            link: '/nav1/grp2/item1'
          },
          {
            permissionKey: 'tmr.menu.nav1.grp2.item2',
            menuName: '选项二',
            menuClass: 'el-icon-location',
            seq: 2,
            link: '/nav1/grp2/item2'
          }]
      }]
  },
  {
    permissionKey: 'tmr.menu.nav2',
    menuName: '导航2',
    menuClass: 'el-icon-location',
    seq: 2,
    link: null,
    children: [
      {
        permissionKey: 'tmr.menu.nav2.grp1',
        menuName: '分组一',
        menuClass: null,
        seq: 1,
        link: null,
        children: [
          {
            permissionKey: 'tmr.menu.nav2.grp1.item1',
            menuName: '选项一',
            menuClass: null,
            seq: 1,
            link: '/nav1/grp2/item1'
          },
          {
            permissionKey: 'tmr.menu.nav2.grp1.item2',
            menuName: '选项二',
            menuClass: null,
            seq: 2,
            link: '/nav2/grp1/item2'
          }]
      },
      {
        permissionKey: 'tmr.menu.nav2.grp2',
        menuName: '分组二',
        menuClass: null,
        seq: 2,
        link: null,
        children: [
          {
            permissionKey: 'tmr.menu.nav2.grp2.item1',
            menuName: '选项一',
            menuClass: null,
            seq: 1,
            link: '/nav2/grp2/item1'
          },
          {
            permissionKey: 'tmr.menu.nav2.grp2.item2',
            menuName: '选项二',
            menuClass: null,
            seq: 2,
            link: '/nav2/grp2/item2'
          }]
      }]
  },
  {
    permissionKey: 'tmr.menu.nav3',
    menuName: '导航3',
    menuClass: 'el-icon-location',
    seq: 3,
    link: null,
    children: [
      {
        permissionKey: 'tmr.menu.nav3.grp1',
        menuName: '分组一',
        menuClass: null,
        seq: 1,
        link: null,
        children: [
          {
            permissionKey: 'tmr.menu.nav3.grp1.item1',
            menuName: '选项一',
            menuClass: null,
            seq: 1,
            link: '/nav3/grp1/item1'
          },
          {
            permissionKey: 'tmr.menu.nav3.grp1.item2',
            menuName: '选项二',
            menuClass: null,
            seq: 2,
            link: '/nav3/grp1/item2'
          }]
      },
      {
        permissionKey: 'tmr.menu.nav13.grp2',
        menuName: '分组二',
        menuClass: null,
        seq: 2,
        link: null,
        children: [
          {
            permissionKey: 'tmr.menu.nav3.grp2.item1',
            menuName: '选项一',
            menuClass: null,
            seq: 1,
            link: '/nav3/grp2/item1'
          },
          {
            permissionKey: 'tmr.menu.nav3.grp2.item2',
            menuName: '选项二',
            menuClass: null,
            seq: 2,
            link: '/nav3/grp2/item2'
          }]
      }]
  },
  {
    permissionKey: 'tmr.menu.nav4',
    menuName: '导航4',
    menuClass: 'el-icon-location',
    seq: 4,
    link: null,
    children: [
      {
        permissionKey: 'tmr.menu.nav4.grp1',
        menuName: '分组一',
        menuClass: null,
        seq: 1,
        link: '/nav4/grp1'
      },
      {
        permissionKey: 'tmr.menu.nav4.grp2',
        menuName: '分组二',
        menuClass: null,
        seq: 2,
        link: '/nav4/grp2'
      }]
  },
  {
    permissionKey: 'tmr.menu.theme',
    menuName: '主题展示',
    menuClass: 'el-icon-location',
    seq: 5,
    link: '/theme'
  }]

const adminMenus = [{
  permissionKey: 'tmr.menu.theme',
  menuName: '主题展示',
  menuClass: 'el-icon-location',
  seq: 5,
  link: '/theme'
}]

const state = {
  tmrMenus: tmrMenus,
  adminMenus: adminMenus
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
