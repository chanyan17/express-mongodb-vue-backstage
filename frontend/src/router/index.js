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
      }
    ]
  },
  {
    path: '/functionsManage',
    redirect: '/functionsManage/index',
    component: Layout,
    children: [
      {
        path: '/functionsManage/index',
        component: resolve => require(['@/views/functionsManage/index.vue'], resolve)
      },
      {
        path: '/functionsManage/create',
        component: resolve => require(['@/views/functionsManage/create.vue'], resolve)
      }
    ]
  }
]

const router = new Router({
  routes
})

export default router
