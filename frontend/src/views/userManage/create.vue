<template>
  <div class="main-container">
    <div class="main">
      <div class="title">新建用户</div>
      <div class="form">
        <el-form ref="form" :model="form" :rules="formRules" label-width="80px" label-position="left" size="small">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="form.mobile"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" prop="email">
              <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="form.sex">
              <el-radio-button label="male">男</el-radio-button>
              <el-radio-button label="female">女</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="角色" prop="roleIds">
            <el-checkbox-group v-model="form.roleIds">
              <el-checkbox v-for="(role, idx) in roleList" v-bind:key="idx" :label="role.id" name="roleIds">{{role.name}}</el-checkbox>
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
            <el-button type="primary" @click="createUser()">新建用户</el-button>
            <el-button type="info" @click="cancelAndBack()">取消并返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    const usernameValidator = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入角色名'))
      } else {
        callback()
      }
    }

    const mobileValidator = (rule, value, callback) => {
      var exp = /^1[3|4|5|7|8]\d{9}$/
      if (!value) {
        callback(new Error('请输入手机号'))
      } else if (!exp.test(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }

    const emailValidator = (rule, value, callback) => {
      var exp = /^[a-zA-Z0-9]+([._\\-]*[a-zA-Z0-9])*@([a-zA-Z0-9]+[-a-zA-Z0-9]*[a-zA-Z0-9]+.){1,63}[a-zA-Z0-9]+$/
      if (!value) {
        callback(new Error('请输入邮箱'))
      } else if (!exp.test(value)) {
        callback(new Error('请输入正确的邮箱'))
      } else {
        callback()
      }
    }

    return {
      form: {
        username: '',
        mobile: '',
        email: '',
        sex: 'male',
        remark: '',
        roleIds: []
      },
      formRules: {
        username: [{validator: usernameValidator, required: true, trigger: 'blur'}],
        mobile: [{validator: mobileValidator, required: true, trigger: 'blur'}],
        email: [{validator: emailValidator, required: true, trigger: 'blur'}],
        roleIds: [
          { type: 'array', required: true, message: '请至少选择一个角色', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    this.getRoleList()
  },
  computed: {
    ...mapGetters([
      'roleList'
    ])
  },
  methods: {
    getRoleList () {
      this.$store.dispatch('getRoleList', {})
    },
    createUser () {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.$store.dispatch('createUser', this.form).then(() => {
              this.cancelAndBack()
            })
          }
        })
      })
    },
    cancelAndBack () {
      this.$router.push({path: '/userManage/index'})
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