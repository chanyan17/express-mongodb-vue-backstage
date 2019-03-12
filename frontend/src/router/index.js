import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Layout from '@/views/layout/Layout'
import { getToken } from '@/utils/token'

Vue.use(Router)

const staticRoutes = [
  {
    path: '/',
    redirect: '/home/index',
    hidden: true
  },
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['@/views/login/index.vue'], resolve),
    hidden: true
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
    ],
    meta: {
      icon: 'home',
      text: '主页'
    }
  }
]

const router = new Router({
  routes: staticRoutes
})

const whiteList = ['/login']
function hasPermission (to) {
  let arr = []
  store.getters.routes.forEach(item => {
    item.name && (arr.push(item.name))
    if (item.children) {
      item.children.forEach(child => {
        child.name && (arr.push(child.name))
      })
    }
  })
  return arr.some(item => item === to.name)
}
/*
  - 是否存在token
    - 是
      - 路由指向登录页 next(`/home/index`)
      - 是否已获取路由表
        - 是
          - 获取路由表
            - 成功 next()
            - 失败 next(`/login`)
        - 否
          - 判断路由是否在路由表(静态路由+动态路由)当中
            - 是 next()
            - 否 回到上一个有权限路由或者登录界面
    - 否
      - 是否为白名单
        - 是 next()
        - 否 next(`/login`)
*/
router.beforeEach((to, from, next) => {
  let path = to.path
  if (getToken()) {
    if (path === '/Login') {
      next(`/home`)
      return
    }
    if (!store.getters.user.name) {
      store.dispatch('getInitData').then(function () {
        router.addRoutes(store.getters.asynRoutes)
        next({...to, replace: true})
      }).catch(() => {
        // token过期
        store.dispatch('logout').then(function () {
          next(`/login`)
        })
      })
    } else {
      if (hasPermission(to)) {
        next()
      } else {
        console.log(from)
        if (from) {
          next({path: from.path})
        } else {
          next(`/login`)
        }
      }
    }
  } else {
    (whiteList.indexOf(to.path) !== -1) ? next() : next(`/login?redirect=${to.path}`)
  }
})
export default router