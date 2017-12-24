const routes = [{
  name: 'login',
  url: '/login',
  method: 'post'
},{
  name: 'logout',
  url: '/logout',
  method: 'post'
},{
  name: 'getAuth',
  url: '/auth',
  method: 'get'
},{
  name: 'getPermission',
  url: '/auth/permission',
  method: 'get'
}]

const collection = [{
  empUm: 'tmr',
  empName: '坐席',
  // roles: ['ROLE_TMR'],
  permissionMap: {
    'tmr.menu.customer': { access: true, strategy: 'denied', platform: 'tmr' },
    'tmr.menu.customer.query': { access: true, strategy: 'denied', platform: 'tmr' },
    'tmr.menu.customer.add': { access: true, strategy: 'denied', platform: 'tmr' },
    'tmr.menu.customer.update': { access: true, strategy: 'denied', platform: 'tmr' },
    'tmr.menu.customer.delete': { access: true, strategy: 'denied', platform: 'tmr' },

    'tmr.route.root': { access: true, strategy: 'inherit', platform: 'tmr' },

    'tmr.component.root.header.test': { access: true, strategy: 'affirmed', platform: 'tmr' },
  }
},{
  empUm: 'admin',
  empName: '管理员',
  // roles: ['ROLE_ADMIN'],
  permissionMap: {
    'admin.menu.customer': { access: true, strategy: 'denied', platform: 'admin' },
    'admin.menu.customer.query': { access: true, strategy: 'denied', platform: 'admin' },
    'admin.menu.customer.add': { access: false, strategy: 'denied', platform: 'admin' },
    'admin.menu.customer.update': { access: false, strategy: 'denied', platform: 'admin' },
    'admin.menu.customer.delete': { access: false, strategy: 'denied', platform: 'admin' },

    'admin.route.root': { access: true, strategy: 'inherit', platform: 'admin' },

    'admin.component.root.header.test': { access: true, strategy: 'affirmed', platform: 'admin' }
  }
},{
  empUm: 'root',
  empName: '超级管理员',
  // roles: ['ROLE_ADMIN','ROLE_TMR'],
  permissionMap: {
    'admin.menu.customer': { access: true, strategy: 'denied', platform: 'admin' },
    'admin.menu.customer.query': { access: true, strategy: 'denied', platform: 'admin' },
    'admin.menu.customer.add': { access: true, strategy: 'denied', platform: 'admin' },
    'admin.menu.customer.update': { access: false, strategy: 'denied', platform: 'admin' },
    'admin.menu.customer.delete': { access: true, strategy: 'denied', platform: 'admin' },

    'tmr.menu.customer': { access: true, strategy: 'denied', platform: 'tmr' },
    'tmr.menu.customer.query': { access: true, strategy: 'denied', platform: 'tmr' },
    'tmr.menu.customer.add': { access: true, strategy: 'denied', platform: 'tmr' },
    'tmr.menu.customer.update': { access: true, strategy: 'denied', platform: 'tmr' },
    'tmr.menu.customer.delete': { access: true, strategy: 'denied', platform: 'tmr' },

    'tmr.route.root': { access: true, strategy: 'inherit', platform: 'tmr' },
    'admin.route.root': { access: true, strategy: 'inherit', platform: 'admin' },

    'tmr.component.root.header.test': { access: true, strategy: 'affirmed', platform: 'tmr' },
    'admin.component.root.header.test': { access: true, strategy: 'affirmed', platform: 'admin' }
  }
}]


const handler = function (route,req) {
  var h = handler[route.name]
  if(typeof h === "function"){
    return h(route,req);
  }
  throw new Error(`${route.url} not handled`);
}

module.exports = {
  routes: routes,
  key: 'auth',
  handler: handler
}



//---//


handler.login = function (route,req) {
  let empUm = req.body.username;
  let target = null
  collection.some(function (v) {
    if(v.empUm === empUm){
      target = v
      return true
    }
  })
  if(target) {
    req.session.auth = target
    return null;
  }
  throw new Error('not found user');
}

handler.logout = function (route,req) {
  req.session.auth = null
  return null
}

handler.getAuth = function (route,req) {
  if(!req.session.auth) throw new Error('no auth')
  return req.session.auth
}

handler.getPermission = function (route,req) {
  if(!req.session.auth) throw new Error('no auth')
  return req.session.auth.permissionMap
}




