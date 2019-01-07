<template>
  <el-container>
    <el-aside :width="isCollapseMenu ? '64px' : '172px'">
      <head-logo></head-logo>
      <side-nav></side-nav>
    </el-aside>
    <el-main>
      <head-bar></head-bar>
      <router-view/>
    </el-main>
  </el-container>
</template>
<script>
import HeadLogo from '@/views/layout/HeadLogo'
import HeadBar from '@/views/layout/HeadBar'
import SideNav from '@/views/layout/SideNav'
import { mapGetters } from 'vuex'
export default {
  name: 'Layout',
  components: {
    HeadLogo,
    HeadBar,
    SideNav
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters([
      'isCollapseMenu'
    ])
  }
}
</script>
<style>
.el-container {
  height: 100%;
}

.el-aside {
  position: relative;
  box-sizing: border-box;
  padding-top: 68px;
  height: 100%;
  background-color: #001529;
  color: #333;
  text-align: center;
}

.el-main {
  position: relative;
  box-sizing: border-box;
  padding-top: 68px;
  height: 100%;
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
}
</style>