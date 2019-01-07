<template>
  <div class="timer">
    <span class="timer_time">{{ timeStamp | dateFormat('yyyy-MM-dd hh:mm:ss') }}</span>
    <span class="timer_week">{{ $t('weeks')[weekIdx] }}</span>
  </div>
</template>
<script>
export default {
  name: 'Timer',
  props: ['timestamp'],
  data () {
    return {
      timer: null,
      count: 0,
      weekIdx: 0,
      timeStamp: 0
    }
  },
  created () {
    this.timeStamp = this.timestamp
    const date = new Date(this.timeStamp)
    this.weekIdx = date.getDay()

    this.timer = setInterval(() => {
      this.timeStamp += 1000
    }, 1000)
  },
  destroy () {
    window.clearInterval(this.timer)
  }
}
</script>
<style scoped>
  .timer_week {
    margin: 0 5px;
  }
</style>