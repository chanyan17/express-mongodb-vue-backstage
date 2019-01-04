<template>
  <div class="main-container">
    <div class="main">
      <div class="title">修改密码</div>
      <div class="form">
        <el-form ref="form" :model="form" label-width="80px" label-position="left" size="small">
          <el-form-item label="原密码">
            <el-input v-model="form.oldPwd" type="password" placeholder="请输入原密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="form.newPwd" type="password" placeholder="请输入6-20位字母、数字组合、特殊字符组成的密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="form.confirmPwd" type="password" placeholder="请再次输入新密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">确定修改</el-button>
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
        oldPwd: '',
        newPwd: '',
        confirmPwd: ''
      }
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