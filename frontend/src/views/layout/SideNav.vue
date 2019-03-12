<template>
  <transition name="slide-fade">
    <el-menu :default-active="defaultActiveRoute" class="el-menu-vertical" @open="handleOpen" @close="handleClose" :collapse="isCollapseMenu">
      <router-link :to="router.link" v-for="(router, index) in _routes" v-bind:key="index">
        <el-menu-item :index="router.link">
          <svg-icon  :icon-class="router.icon"></svg-icon>
          <span slot="title">{{ router.text }}</span>
        </el-menu-item>
      </router-link>
    <!--
      <router-link to="/userManage">
        <el-menu-item index="2">
          <svg-icon  icon-class="user-manage"></svg-icon>
          <span slot="title">用户管理</span>
        </el-menu-item>
      </router-link>
      <router-link to="/roleManage">
        <el-menu-item index="3">
          <svg-icon  icon-class="role-manage"></svg-icon>
          <span slot="title">角色管理</span>
        </el-menu-item>
      </router-link>
      <router-link to="/authManage">
        <el-menu-item index="4">
          <svg-icon  icon-class="function-manage"></svg-icon>
          <span slot="title">权限管理</span>
        </el-menu-item>
      </router-link> -->
    </el-menu>
  </transition>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      isCollapse: false,
      defaultActiveRoute: ''
      // routers: [{
      //   link: '/home/index',
      //   icon: 'home',
      //   text: '主页'
      // }, {
      //   link: '/userManage/index',
      //   icon: 'user-manage',
      //   text: '用户管理'
      // }, {
      //   link: '/roleManage/index',
      //   icon: 'role-manage',
      //   text: '角色管理'
      // }, {
      //   link: '/authManage/index',
      //   icon: 'auth-manage',
      //   text: '权限管理'
      // }]
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.defaultActiveRoute = route.matched[0].path
        console.log(route)
      },
      immediate: true
    }
  },
  computed: {
    ...mapGetters([
      'routes',
      'isCollapseMenu'
    ]),
    _routes () {
      let arr = []
      this.routes.forEach(router => {
        if (!router.hidden) {
          arr.push({
            text: router.meta.text,
            icon: router.meta.icon,
            link: router.path
          })
        }
      })
      return arr
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang="less">
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.el-menu-vertical {
  background-color: #000C17;
  border: none;
  a {
    text-decoration: none;
  }
  .el-menu-item {
    height: 40px;
    line-height: 40px;
    text-align: left;
    color: #FFF;
    background-color: #001529;
    i {
      color: #FFF;
    }
    &:hover {
      background-color: #1890FF;
    }
  }
  .is-active {
    background-color: #1890FF;
  }
  .svg-icon {
    width: 16px !important;
    height: 16px !important;
    vertical-align: middle !important;
  }
}
</style>