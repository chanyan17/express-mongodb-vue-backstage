<template>
    <div class="login-container">
      <div class="login-main">
        <div class="logo">
          <img src="http://temp.im/142x142" alt="">
        </div>
        <el-form ref="form" :model="form" size="large" :rules="formRules">
          <el-form-item prop="username">
              <el-input
                placeholder="请输入账号/手机/邮箱"
                v-model="form.username">
                <template slot="prepend">
                  <span class="iconfont icon-user"></span>
                </template>
              </el-input>
          </el-form-item>
          <el-form-item prop="password">
              <el-input
                placeholder="请输入登录密码"
                v-model="form.password">
                <template slot="prepend">
                  <span class="iconfont icon-pwd"></span>
                </template>
              </el-input>
          </el-form-item>
          <el-form-item prop="code">
              <el-input
                placeholder="请输入图形验证码"
                v-model="form.code">
                <template slot="prepend">
                  <span class="iconfont icon-code"></span>
                </template>
                <div slot="append" class="ib vam">
                  <img class="ib vam pointer" src="http://temp.im/60x30" alt="">
                </div>
              </el-input>
          </el-form-item>
          <el-form-item class="tr">
            <el-checkbox v-model="form.isRemember">记住登录状态</el-checkbox>
          </el-form-item>
          <el-form-item>
             <el-button type="primary" class="login" @click="login()">登 录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        username: 'admin',
        password: '123456',
        code: 'aaaaaa'
      },
      formRules: {
        username: [{
          required: true,
          message: '请输入账号/手机号/邮箱',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入登录密码',
          trigger: 'blur'
        }],
        code: [{
          required: true,
          message: '请输入图形验证码',
          trigger: 'blur'
        }]
      }
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    login () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$store.dispatch('login', this.form).then(() => {
            this.$router.push({ path: this.redirect || '/home' })
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #0079FE;
}
.login-main {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto auto;
  width: 460px;
  height: 440px;
  border-radius: 10px;
  background-color: #FFF;

  .logo {
    position: absolute;
    top: -71px;
    left: 50%;
    margin-left: -71px;
    width: 142px;
    height: 142px;
    border-radius: 50%;
    z-index: 2;
    overflow: hidden;
  }

  .el-form {
    box-sizing: border-box;
    padding: 75px 40px;
    height: 100%;
  }

  .login {
    width: 100%;
  }
}
</style>
<style>
  .el-input-group__append,
  .el-input-group__prepend {
    padding: 0 10px;
  }
</style>