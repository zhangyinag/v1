const getters = {
  auth: state => state.auth,
  menus: state => platform => {
    if (platform === 'tmr') return state.menu.tmrMenus
    else if (platform === 'admin') return state.menu.adminMenus
    else return []
  }
}
export default getters
