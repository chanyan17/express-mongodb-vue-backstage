<template>
  <transition name="slide-fade">
    <el-menu default-active="1-4-1" class="el-menu-vertical" @open="handleOpen" @close="handleClose" :collapse="isCollapseMenu">
      <router-link to="/home">
        <el-menu-item index="1">
          <svg-icon  icon-class="home"></svg-icon>
          <span slot="title">主页</span>
        </el-menu-item>
      </router-link>
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
      <router-link to="/functionsManage">
        <el-menu-item index="4">
          <svg-icon  icon-class="function-manage"></svg-icon>
          <span slot="title">权限管理</span>
        </el-menu-item>
      </router-link>
    </el-menu>
  </transition>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      isCollapse: false
    }
  },
  computed: {
    ...mapGetters([
      'isCollapseMenu'
    ])
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