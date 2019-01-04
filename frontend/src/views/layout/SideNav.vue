<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
    <router-link to="/home">
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">主页</span>
      </el-menu-item>
    </router-link>
    <router-link to="/userManage">
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
    </router-link>
    <router-link to="/roleManage">
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span slot="title">角色管理</span>
      </el-menu-item>
    </router-link>
    <router-link to="/functionsManage">
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">权限管理</span>
      </el-menu-item>
    </router-link>
  </el-menu>
</template>
<script>
export default {
  data () {
    return {
      isCollapse: false
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
}
</style>