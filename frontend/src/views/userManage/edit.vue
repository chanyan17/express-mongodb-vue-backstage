<template>
  <div class="main-container">
    <div class="main">
      <div class="title">编辑用户</div>
      <div class="form">
        <el-form ref="form" :model="form" :rules="formRules" label-width="100px" size="small">
          <el-form-item label="用户名">
              <el-input v-model="form.username" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
              <el-input v-model="form.mobile" :disabled="true"></el-input>
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
          <el-form-item label="状态">
              <el-tag :type="typeMap[form.status]" size="medium">{{ statusMap[form.status] }}</el-tag>
          </el-form-item>
          <el-form-item label="注册时间">
            <el-input v-model="createdAt" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="上次更新时间">
            <el-input v-model="updatedAt" :disabled="true"></el-input>
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
            <el-button type="primary" @click="saveEdit()">保存编辑</el-button>
            <el-button type="info" @click="cancelAndBack()">取消并返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import dateFormat from '@/filters/dateFormat'
export default {
  data () {
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
        sex: '',
        createdAt: '',
        updatedAt: '',
        remark: ''
      },
      initString: '',
      typeMap: {
        normal: 'success',
        unusable: 'info',
        prohibite: 'danger'
      },
      formRules: {
        email: [{validator: emailValidator, required: true, trigger: 'blur'}],
        roleIds: [
          { type: 'array', required: true, message: '请至少选择一个角色', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    this.userId = this.$route.params.userId
    this.getRoleList()
    this.getUserDetail()
  },
  computed: {
    ...mapGetters([
      'roleList',
      'statusMap'
    ]),
    createdAt () {
      return dateFormat(this.form.createdAt, 'yyyy-MM-dd hh:mm:ss')
    },
    updatedAt () {
      return dateFormat(this.form.updatedAt, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  methods: {
    getRoleList () {
      this.$store.dispatch('getRoleList', {})
    },
    getUserDetail () {
      this.$store.dispatch('getUserDetail', {
        id: this.userId
      }).then(ret => {
        this.form = ret
        for (let i in this.form) {
          this.initString += this.form[i]
        }
      })
    },
    saveEdit () {
      let str = ''
      for (let i in this.form) {
        str += this.form[i]
      }

      if (str === this.initString) {
        this.cancelAndBack()
        return false
      }

      return new Promise((resolve, reject) => {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.form.id = this.userId
            this.$store.dispatch('updateUser', this.form).then(() => {
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