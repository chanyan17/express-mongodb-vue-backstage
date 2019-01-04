<template>
  <div class="main-container">
    <div class="main">
      <div class="title">新建用户</div>
      <div class="form">
        <el-form ref="form" :model="form" label-width="80px" label-position="left" size="small">
          <el-form-item label="用户名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="form.mobile"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱">
              <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="form.sex">
              <el-radio-button label="male">男</el-radio-button>
              <el-radio-button label="female">女</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="角色">
            <el-checkbox-group v-model="form.roles" :min="1">
              <el-checkbox v-for="role in roles" :label="role" :key="role">{{role}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="form.remark"
              :autosize="{ minRows: 2, maxRows: 4}"
              resize="none">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">新建用户</el-button>
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
        mobile: '',
        sex: '',
        roles: []
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