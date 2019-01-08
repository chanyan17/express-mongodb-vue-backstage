<template>
    <div class="header">
      <el-button type="primary" @click="openLoading()">{{loadingText}}</el-button>
    </div>
</template>
<script>
export default {
  data () {
    return {
      loadingText: '打开Loading',
      loadingTime: 5
    }
  },
  created () {
    console.log(this.$route)
  },
  methods: {
    openLoading () {
      this.$store.commit('SHOW_LOADING', {
        text: '加载中',
        spinner: '',
        background: 'rgba(0, 0, 0, 0.3)'
      })
      let clock = window.setInterval(() => {
        this.loadingText = `${this.loadingTime}s后关闭Loading`
        this.loadingTime--

        if (this.loadingTime < 0) {
          window.clearInterval(clock)
          this.$store.commit('HIDE_LOADING')

          this.loadingText = '打开Loading'
          this.loadingTime = 5
        }
      }, 1000)
    }
  }
}
</script>
<style lang="less" scoped>

</style>