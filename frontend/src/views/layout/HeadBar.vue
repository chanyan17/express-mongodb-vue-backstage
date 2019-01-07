<template>
  <div class="container">
    <div class="top">
      <el-col :span="12" class="calendar">
        <span class="menu-switch" :title="collapseMenuTxt" @click=toggleCollapseMenu()>
          <svg-icon  :icon-class="collapseMenuSvg"></svg-icon>
        </span>
        <div class="current-time">
          <timer :timestamp="timestamp"></timer>
        </div>
      </el-col>
      <el-col :span="12" class="actions">
        <router-link to="/login">
          <span class="logout" :title="$t('header.logout')">
            <svg-icon  icon-class="logout"></svg-icon>
          </span>
        </router-link>
        <router-link to="/userCenter">
            <div class="user">
              <span class="portrait">
                  <img src="http://temp.im/30x30" alt="">
              </span>
              <span class="username">admin</span>
            </div>
        </router-link>
        <div class="language" :title="$t('header.language')" @click="toggleLanguage()">
          <svg-icon  :icon-class="language"></svg-icon>
        </div>
      </el-col>
    </div>
  </div>
</template>
<script>
import Timer from '@/components/Timer'
import { mapGetters } from 'vuex'
export default {
  components: {
    Timer
  },
  data () {
    return {
      timestamp: (new Date()).getTime()
    }
  },
  computed: {
    ...mapGetters([
      'isCollapseMenu',
      'language'
    ]),
    collapseMenuSvg () {
      return this.isCollapseMenu ? 'to-right' : 'to-left'
    },
    collapseMenuTxt () {
      return this.isCollapseMenu ? '展开菜单' : '收起菜单'
    }
  },
  methods: {
    toggleCollapseMenu () {
      this.$store.commit('TOGGLE_COLLAPSE_MENU')
    },
    toggleLanguage () {
      this.$store.commit('TOGGLE_LANGUAGE')
      this.$i18n.locale = this.language
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 68px;
  .top {
    width: 100%;
    height: 48px;
    line-height: 48px;
    background-color: #FFF;
    .calendar {
        display: flex;
    }
    .el-col {
        height: 48px;
        line-height: 48px;
        text-align: left;
    }
    .menu-switch {
        display: inline-block;
        vertical-align: middle;
        margin: 0 5px 0 10px;
        padding: 0 10px;
        height: 48px;
        line-height: 48px;
        cursor: pointer;
        .svg-icon {
            vertical-align: -0.1em
        }
    }
    .current-time {
        margin-right: 5px;
        display: inline-block;
        vertical-align: middle;
        line-height: 48px;
        color: #979797;
        font-size: 12px;
    }
    .actions {
        text-align: right;
        overflow: hidden;
    }
    .user {
        float: right;
        margin-right: 10px;
        height: 48px;
        line-height: 48px;
        color: #606266;
    }
    .language {
        float: right;
        margin-right: 20px;
        height: 48px;
        line-height: 48px;
        color: #606266;
        cursor: pointer;
        .svg-icon {
          width: 20px;
          height: 20px;
          vertical-align: middle;
        }
    }
    .logout {
        float: right;
        margin-right: 10px;
        color: #606266;
        padding: 0 10px;
        width: 20px;
        height: 48px;
        line-height: 48px;
    }
    .portrait {
        float: left;
        height: 48px;
        line-height: 48px;
        img {
            display: inline-block;
            vertical-align: middle;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: aqua;
        }
    }
    .username{
        float: left;
        margin-left: 5px;
        color: #606266;
    }
  }
}
</style>