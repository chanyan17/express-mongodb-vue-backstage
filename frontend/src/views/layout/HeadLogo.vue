<template>
  <el-container :class="isCollapseMenu ? 'el-collapse-container' : ''">
    <div class="logo">
      <span class="pic">
        <img src="@/assets/logo.png" alt="">
      </span>
      <span class="name" v-show="!isCollapseMenu">{{ $t('system') }}</span>
    </div>
  </el-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'isCollapseMenu'
    ])
  }
}
</script>
<style lang="less" scoped>
    .el-container {
        position: absolute;
        left: 0;
        top: 0;
        padding-left: 20px;
        width: 100%;
        height: 68px;
        line-height: 68px;
        color: #FFF;
        text-align: left;

        div {
            width: 100%;
        }
    }
    .el-collapse-container {
      padding-left: 10px;
    }

    .logo {
        .pic {
            display: inline-block;
            vertical-align: middle;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: aliceblue;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
        }
        .name {
            display: inline-block;
            vertical-align: middle;
            margin-left: 10px;
        }
    }
</style>