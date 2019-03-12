const getters = {
  token: state => state.user.token,
  isCollapseMenu: state => state.base.isCollapseMenu,
  language: state => state.base.language,
  user: state => state.init.user,
  asynRoutes: state => state.init.asynRoutes,
  routes: state => state.init.routes,
  sexes: state => state.init.sexes,
  sexMap: state => state.init.sexMap,
  authTypes: state => state.init.authTypes,
  authTypeMap: state => state.init.authTypeMap,
  displayModes: state => state.init.displayModes,
  displayModeMap: state => state.init.displayModeMap,
  status: state => state.init.status,
  statusMap: state => state.init.statusMap,
  authList: state => state.auth.authList,
  authTotalCount: state => state.auth.authTotalCount,
  parentAuths: state => state.auth.parentAuths,
  parentAuthMap: state => state.auth.parentAuthMap,
  roleList: state => state.role.roleList,
  roleTotalCount: state => state.role.roleTotalCount,
  userList: state => state.user.userList,
  userTotalCount: state => state.user.userTotalCount
}

export default getters
