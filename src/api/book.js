import http from '@/utils/http'

export function getBooks () {
  return http({
    url: '/books',
    method: 'get'
  })
}

export function _401 () {
  return http({
    url: '/401',
    method: 'get'
  })
}

export function _403 () {
  return http({
    url: '/403',
    method: 'get'
  })
}

export function _404 () {
  return http({
    url: '/404',
    method: 'get'
  })
}

export function _500 () {
  return http({
    url: '/500',
    method: 'get'
  })
}
