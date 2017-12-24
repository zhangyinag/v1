import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import {getAuth, getPermission} from '@/api/auth'
import * as types from '@/store/mutation-types'

import Login from '@/views/Login.vue'
import NotFound from '@/views/NotFound.vue'
import NotAuthorized from '@/views/NotAuthorized.vue'
import Book from '@/views/Book.vue'

Vue.use(Router)

// 公用路由
export const commonRoutes = [
  { path: '/login', component: Login, name: 'login' },
  { path: '/books', component: Book },
  { path: '/404', component: NotFound, name: 'notFound' },
  { path: '/403', component: NotAuthorized, name: 'notAuthorized' },
  { path: '', redirect: '/login' },
  { path: '*', redirect: '/404' }
]

// 坐席端路由
export const tmrAsyncRoutes = [
  {
    path: '/tmr',
    component: () => import('@/views/tmr/TmrRoot.vue'),
    name: 'tmr',
    meta: { permissionKey: 'tmr.route.root' },
    children: [
      { path: 'theme', component: () => import('@/views/Theme.vue') },
      { path: '404', component: () => import('@/views/NotFound.vue'), name: 'tmrNotFound' },
      { path: '403', component: () => import('@/views/NotAuthorized.vue'), name: 'tmrNotAuthorized' },
      { path: '*', redirect: '404' }
    ]
  }
]

// 管理端路由
export const adminAsyncRoutes = [
  {
    path: '/admin',
    component: () => import('@/views/admin/AdminRoot.vue'),
    name: 'admin',
    meta: { permissionKey: 'admin.route.root' },
    children: [
      { path: 'theme', component: () => import('@/views/Theme.vue') },
      { path: '404', component: () => import('@/views/NotFound.vue'), name: 'adminNotFound' },
      { path: '403', component: () => import('@/views/NotAuthorized.vue'), name: 'adminNotAuthorized' },
      { path: '*', redirect: '404' }
    ]
  }
]

const router = new Router({
  // mode: 'history',
  routes: commonRoutes.concat(tmrAsyncRoutes).concat(adminAsyncRoutes)
})

router.beforeEach((to, from, next) => {
  if (isOnWhiteList(to)) {
    next()
    return
  }
  // 是否登录
  if (!store.getters.auth.authenticated) {
    tryLogin().then(() => {
      if (checkPermission(to)) {
        if (to.name === 'tmr' || to.name === 'admin') store.commit(types.SET_PLATFORM, to.name)
        next()
      } else {
        handleNoPermission(to, next)
      }
    }).catch((err) => {
      console.log(err)
      next(false)
    })
  } else {
    if (checkPermission(to)) {
      if (to.name === 'tmr' || to.name === 'admin') store.commit(types.SET_PLATFORM, to.name)
      next()
    } else {
      handleNoPermission(to, next)
    }
  }
})

function handleNoPermission (to, next) {
  if (to.name === 'tmr' || to.name === 'admin') {
    let name = to.name === 'tmr' ? 'admin' : (to.name === 'admin' ? 'tmr' : '')
    if (store.getters.hasPermission(`${name}.route.root`)) {
      next({name: name})
    } else {
      next({name: 'notAuthorized'})
    }
  } else next({name: store.getters.auth.platform + 'NotAuthorized'})
}

function tryLogin () {
  return getAuth().then(res => {
    if (res.success) {
      store.commit(types.SET_AUTH, res.data)
      return Promise.resolve()
    }
    return Promise.reject(new Error(0))
  }).then(() => { // 获取permissionMap
    return getPermission().then(res => {
      if (res.success) {
        store.commit(types.SET_PERMISSION, res.data)
        store.commit(types.SET_AUTHENTICATED, true)
      }
      return Promise.reject(new Error(0))
    }).catch(err => {
      return Promise.reject(err)
    })
  })
}

function checkPermission (to) {
  let permissionKey = to.meta.permissionKey
  if (!permissionKey) { // 没有配置则允许，对路由来说是没有太大问题
    return true
  }
  return store.getters.hasPermission(permissionKey)
}

function isOnWhiteList (route) {
  return commonRoutes.some(function (v) {
    return (route.name === v.name && route.name !== undefined) || v.path.startsWith(route.path)
  })
}

export default router
