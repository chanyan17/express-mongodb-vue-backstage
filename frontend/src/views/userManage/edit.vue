<template>
  <div class="main-container">
    <div class="main">
      <div class="title">编辑用户</div>
      <div class="form">
        <el-form ref="form" :model="form" label-width="100px" size="small">
          <el-form-item label="用户名">
              <el-input v-model="form.name" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
              <el-input v-model="form.mobile" :disabled="true"></el-input>
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
          <el-form-item label="状态">
              <el-tag type="success" size="medium">正常</el-tag>
              <el-tag type="info" size="medium">停用</el-tag>
              <el-tag type="danger" size="medium">禁用</el-tag>
          </el-form-item>
          <el-form-item label="注册时间">
            <el-input v-model="form.createdAt" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="上次更新时间">
            <el-input v-model="form.updatedAt" :disabled="true"></el-input>
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
            <el-button type="primary">保存编辑</el-button>
            <el-button type="info">取消并返回</el-button>
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
        name: 'Admin',
        mobile: '13560123456',
        email: '10@qq.com',
        sex: 'male',
        createdAt: '2019-01-03',
        updatedAt: '2019-01-03',
        remark: ''
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