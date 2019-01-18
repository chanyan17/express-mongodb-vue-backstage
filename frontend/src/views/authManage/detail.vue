<template>
  <div class="main-container">
    <div class="main">
      <div class="title">权限详情</div>
      <div class="form">
        <el-form ref="form" :model="form" label-width="120px" label-position="left" size="small">
          <el-form-item label="权限名称">
            <div>{{form.name}}</div>
          </el-form-item>
          <el-form-item label="父层权限名称">
            <div>{{parentAuthMap[form.parentId]}}</div>
          </el-form-item>
          <el-form-item label="权限类型">
            <div>{{authTypeMap[form.authType]}}</div>
          </el-form-item>
          <el-form-item label="请求地址">
            <div>{{form.location}}</div>
          </el-form-item>
          <el-form-item label="权限标识">
            <div>{{form.authSign}}</div>
          </el-form-item>
          <el-form-item label="连接目标">
            <div>{{displayModeMap[form.displayMode]}}</div>
          </el-form-item>
          <el-form-item label="可见状态">
            <div>{{form.isDisplay ? '可见' : '不可见'}}</div>
          </el-form-item>
          <el-form-item label="备注">
            <div>{{form.remark}}</div>
          </el-form-item>
        </el-form>
        <el-button type="info" @click="backList()">返回列表</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      authId: 0,
      form: {}
    }
  },
  created () {
    if (!this.authTypes.length) {
      this.$store.dispatch('getInitData')
    }
    if (!this.parentAuths.length) {
      this.$store.dispatch('getParentAuth')
    }
    this.authId = this.$route.params.authId
    this.getDetail()
  },
  computed: {
    ...mapGetters([
      'authTypes',
      'authTypeMap',
      'displayModeMap',
      'parentAuths',
      'parentAuthMap'
    ])
  },
  methods: {
    getDetail () {
      this.$store.dispatch('getDetail', {
        id: this.authId
      }).then((data) => {
        this.form = data
      })
    },
    backList () {
      this.$router.push({path: '/authManage/index'})
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../styles/less/base.less';
.el-form-item {
  text-align: right;
  border-bottom: 1px solid #ebeef5;
}
</style>