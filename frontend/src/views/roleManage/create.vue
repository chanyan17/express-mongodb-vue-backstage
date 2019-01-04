<template>
  <div class="main-container">
    <div class="main">
      <div class="title">新建角色</div>
      <div class="form">
        <el-form ref="form" :model="form" label-width="80px" label-position="left" size="small">
          <el-form-item label="角色名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="form.desc"
              :autosize="{ minRows: 2, maxRows: 4}"
              resize="none">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">新建角色</el-button>
            <el-button type="primary">新建并配置权限</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        name: '',
        desc: ''
      },
      roles: ['校领导', '老师', '家长', '学生']
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../styles/less/base.less';
.el-form-item {
  text-align: left;
}
</style>