import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'

Vue.use(Router)

export const routes = [
  {
    path: '/',
    redirect: '/home/index'
  },
  {
    path: '/login',
    component: resolve => require(['@/views/login/index.vue'], resolve)
  },
  {
    path: '/home',
    redirect: '/home/index',
    component: Layout,
    children: [
      {
        path: '/home/index',
        name: 'home',
        component: resolve => require(['@/views/home/index.vue'], resolve)
      }
    ]
  },
  {
    path: '/userCenter',
    redirect: '/userCenter/index',
    component: Layout,
    children: [
      {
        path: '/userCenter/index',
        component: resolve => require(['@/views/userCenter/index.vue'], resolve)
      },
      {
        path: '/userCenter/pwd',
        component: resolve => require(['@/views/userCenter/pwd.vue'], resolve)
      }
    ]
  },
  {
    path: '/userManage',
    redirect: '/userManage/index',
    component: Layout,
    children: [
      {
        path: '/userManage/index',
        component: resolve => require(['@/views/userManage/index.vue'], resolve)
      },
      {
        path: '/userManage/create',
        component: resolve => require(['@/views/userManage/create.vue'], resolve)
      },
      {
        path: '/userManage/edit',
        name: 'userEdit',
        component: resolve => require(['@/views/userManage/edit.vue'], resolve)
      }
    ]
  },
  {
    path: '/roleManage',
    redirect: '/roleManage/index',
    component: Layout,
    children: [
      {
        path: '/roleManage/index',
        component: resolve => require(['@/views/roleManage/index.vue'], resolve)
      },
      {
        path: '/roleManage/create',
        component: resolve => require(['@/views/roleManage/create.vue'], resolve)
      },
      {
        path: '/roleManage/edit/:roleId',
        component: resolve => require(['@/views/roleManage/edit.vue'], resolve)
      },
      {
        path: '/roleManage/authConfig/:roleId',
        component: resolve => require(['@/views/roleManage/authConfig.vue'], resolve)
      }
    ]
  },
  {
    path: '/authManage',
    redirect: '/authManage/index',
    component: Layout,
    children: [
      {
        path: '/authManage/index',
        component: resolve => require(['@/views/authManage/index.vue'], resolve)
      },
      {
        path: '/authManage/create',
        component: resolve => require(['@/views/authManage/create.vue'], resolve)
      },
      {
        path: '/authManage/edit/:authId',
        component: resolve => require(['@/views/authManage/edit.vue'], resolve)
      },
      {
        path: '/authManage/detail/:authId',
        component: resolve => require(['@/views/authManage/detail.vue'], resolve)
      }
    ]
  }
]

const router = new Router({
  routes
})

export default router
