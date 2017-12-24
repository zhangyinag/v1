import http from '@/utils/http'

export function login (req) {
  return http({
    url: '/login',
    method: 'post',
    data: req
  })
}

export function getAuth (uername) { // 由于测试服务器还没有配session功能， 才传入username
  return http({
    url: '/auth',
    method: 'get',
    params: {
      username: uername
    }
  })
}

export function getPermission (platform, username) {
  return http({
    url: '/auth/permission',
    method: 'get',
    params: {
      username: username,
      platform: platform
    }
  })
}
