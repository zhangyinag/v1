import {getters} from '@/store/modules/permission'

describe('permission.js', () => {
  // 模拟状态
  const state = {
    permissionMap: {
      'admin.menu.customer': { access: true, strategy: 'denied', platform: 'admin' },
      'admin.menu.customer.query': { access: true, strategy: 'denied', platform: 'admin' },
      'admin.menu.customer.add': { access: false, strategy: 'denied', platform: 'admin' },
      'admin.menu.customer.update': { access: false, strategy: 'denied', platform: 'admin' },
      'admin.menu.customer.delete': { access: false, strategy: 'denied', platform: 'admin' },

      'tmr.menu.customer': { access: true, strategy: 'denied', platform: 'tmr' },
      'tmr.menu.customer.query': { access: true, strategy: 'denied', platform: 'tmr' },
      'tmr.menu.customer.add': { access: true, strategy: 'denied', platform: 'tmr' },
      'tmr.menu.customer.update': { access: true, strategy: 'denied', platform: 'tmr' },
      'tmr.menu.customer.delete': { access: true, strategy: 'denied', platform: 'tmr' },

      'tmr.route.root': { access: true, strategy: 'inherit', platform: 'tmr' },
      'admin.route.root': { access: false, strategy: 'inherit', platform: 'admin' },

      'tmr.component.root.header.test': { access: true, strategy: 'affirmed', platform: 'tmr' },
      'admin.component.root.header.test': { access: true, strategy: 'affirmed', platform: 'admin' }
    }
  }
  it('test has permission: admin.menu.customer.query', () => {
    const result = getters.hasPermission(state)('admin.menu.customer.query')
    expect(result).to.equal(true)
  })

  it('test has not permission: admin.menu.customer.add', () => {
    const result = getters.hasPermission(state)('admin.menu.customer.add')
    expect(result).to.equal(false)
  })

  it('test has not permission: admin.menu.customer.query.some', () => {
    const result = getters.hasPermission(state)('admin.menu.customer.query.some')
    expect(result).to.equal(false)
  })

  it('test has permission: admin.menu.customer.query', () => {
    const result = getters.hasPermission(state)('admin.menu.customer.query')
    expect(result).to.equal(true)
  })

  it('test has permission: tmr.component.root.header.test', () => {
    const result = getters.hasPermission(state)('tmr.component.root.header.test')
    expect(result).to.equal(true)
  })

  it('test has permission: tmr.component.root.header.test.some', () => {
    const result = getters.hasPermission(state)('tmr.component.root.header.test.some')
    expect(result).to.equal(true)
  })

  it('test has permission: tmr.route.root', () => {
    const result = getters.hasPermission(state)('tmr.route.root')
    expect(result).to.equal(true)
  })

  it('test has permission: tmr.route.root.some', () => {
    const result = getters.hasPermission(state)('tmr.route.root.some')
    expect(result).to.equal(true)
  })

  it('test has not permission: admin.route.root', () => {
    const result = getters.hasPermission(state)('admin.route.root')
    expect(result).to.equal(false)
  })

  it('test has not permission: admin.route.root.some', () => {
    const result = getters.hasPermission(state)('admin.route.root.some')
    expect(result).to.equal(false)
  })
})
