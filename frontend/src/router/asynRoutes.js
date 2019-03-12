import Layout from '@/views/layout/Layout'

const asynRoutesMap = {
  userCenter: {
    path: '/userCenter',
    redirect: '/userCenter/index',
    component: Layout,
    children: [
      {
        path: '/userCenter/index',
        name: 'userCenterIndex',
        component: resolve => require(['@/views/userCenter/index.vue'], resolve)
      },
      {
        path: '/userCenter/pwd',
        name: 'userCenterPwd',
        component: resolve => require(['@/views/userCenter/pwd.vue'], resolve)
      }
    ],
    hidden: true
  },
  userManage: {
    path: '/userManage',
    redirect: '/userManage/index',
    component: Layout,
    children: [
      {
        path: '/userManage/index',
        name: 'userManageIndex',
        component: resolve => require(['@/views/userManage/index.vue'], resolve)
      },
      {
        path: '/userManage/create',
        name: 'userManageCreate',
        component: resolve => require(['@/views/userManage/create.vue'], resolve)
      },
      {
        path: '/userManage/edit/:userId',
        name: 'userManageEdit',
        component: resolve => require(['@/views/userManage/edit.vue'], resolve)
      }
    ],
    meta: {
      icon: 'user-manage',
      text: '用户管理'
    }
  },
  roleManage: {
    path: '/roleManage',
    redirect: '/roleManage/index',
    component: Layout,
    children: [
      {
        path: '/roleManage/index',
        name: 'roleManageIndex',
        component: resolve => require(['@/views/roleManage/index.vue'], resolve)
      },
      {
        path: '/roleManage/create',
        name: 'roleManageCreate',
        component: resolve => require(['@/views/roleManage/create.vue'], resolve)
      },
      {
        path: '/roleManage/edit/:roleId',
        name: 'roleManageEdit',
        component: resolve => require(['@/views/roleManage/edit.vue'], resolve)
      },
      {
        path: '/roleManage/authConfig/:roleId',
        name: 'roleManageAuthConfig',
        component: resolve => require(['@/views/roleManage/authConfig.vue'], resolve)
      }
    ],
    meta: {
      icon: 'role-manage',
      text: '角色管理'
    }
  },
  authManage: {
    path: '/authManage',
    redirect: '/authManage/index',
    component: Layout,
    children: [
      {
        path: '/authManage/index',
        name: 'authManageIndex',
        component: resolve => require(['@/views/authManage/index.vue'], resolve)
      },
      {
        path: '/authManage/create',
        name: 'authManageCreate',
        component: resolve => require(['@/views/authManage/create.vue'], resolve)
      },
      {
        path: '/authManage/edit/:authId',
        name: 'authManageEdit',
        component: resolve => require(['@/views/authManage/edit.vue'], resolve)
      },
      {
        path: '/authManage/detail/:authId',
        name: 'authManageDetail',
        component: resolve => require(['@/views/authManage/detail.vue'], resolve)
      }
    ],
    meta: {
      icon: 'auth-manage',
      text: '权限管理'
    }
  }
}
export default asynRoutesMap