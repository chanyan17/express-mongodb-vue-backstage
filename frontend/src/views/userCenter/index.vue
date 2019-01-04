<template>
  <div class="user-center-wrapper">
    <div class="main">
      <div class="user-portrait">
        <img src="http://temp.im/110x110" alt="">
        <div class="modify-portrait">
          <el-button type="primary">修改头像</el-button>
        </div>
      </div>
      <div class="user-info">
        <el-form ref="form" :model="form" label-width="80px" size="small">
          <el-form-item label="用户名">
              <el-input v-model="form.name" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
              <el-input v-model="form.mobile" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱">
              <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="密码">
              <span class="action" @click="modifyPwd()"><i class="el-icon-edit"></i> 修改密码</span>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="form.sex">
              <el-radio-button label="male">男</el-radio-button>
              <el-radio-button label="female">女</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="所属角色">
            <el-tag size="medium">学生</el-tag>
            <span class="action functions-summary"><i class="el-icon-info"></i> 权限汇总</span>
          </el-form-item>
          <el-form-item label="状态">
              <el-tag type="success" size="medium">正常</el-tag>
              <el-tag type="info" size="medium">停用</el-tag>
              <el-tag type="danger" size="medium">禁用</el-tag>
          </el-form-item>
          <el-form-item label="注册时间">
            <el-input v-model="form.createdAt" :disabled="true"></el-input>
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
            <el-button type="primary">保存个人信息</el-button>
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
        remark: ''
      }
    }
  },
  methods: {
    modifyPwd () {
      this.$router.push({path: '/userCenter/pwd'})
    }
  }
}
</script>
<style lang="less" scoped>
.user-center-wrapper {
    width: 100%;
    height: 100%;
    background-color: #FFF;
    .main {
        display: flex;
        margin: 0px auto;
        padding: 80px 0;
        width: 640px;
    }
    .user-portrait {
        width: 210px;
        img {
            width: 110px;
            height: 110px;
            border-radius: 50%;
        }
    }
    .modify-portrait {
        margin-top: 20px;
    }
    .action {
      color: #1890FF;
      cursor: pointer;
    }
    .functions-summary {
      margin-left: 10px;
    }
    .el-form {
      width: 380px;
    }
    .el-form-item {
      text-align: left;
    }
}
</style>