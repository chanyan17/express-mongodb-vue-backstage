<template>
  <div class="main-container">
    <div class="main">
      <div class="title">新建角色</div>
      <div class="form">
        <el-form ref="form" :model="form" :rules="formRules" label-width="80px" label-position="left" size="small">
          <el-form-item label="角色标识" prop="id">
            <el-input v-model="form.id"></el-input>
          </el-form-item>
          <el-form-item label="角色名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="desc">
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
            <el-button type="primary" @click="createRole()">新建角色</el-button>
            <el-button type="primary" @click="createAndConfig()">新建并配置权限</el-button>
            <el-button type="info" @click="cancelAndBack()">取消并返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    const idValidator = (rule, value, callback) => {
      var exp = /^[A-Za-z]+$/
      if (!value) {
        callback(new Error('请输入角色标识'))
      } else if (!exp.test(value)) {
        callback(new Error('角色标识只能使用英文字母'))
      } else {
        callback()
      }
    }

    const nameValidator = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入角色名'))
      } else if (value.length > 10) {
        callback(new Error('角色名不能超过10个字'))
      } else {
        callback()
      }
    }

    const descValidator = (rule, value, callback) => {
      if (value && value.length > 50) {
        callback(new Error('角色名不能超过50字'))
      } else {
        callback()
      }
    }

    return {
      form: {
        id: '',
        name: '',
        desc: ''
      },
      formRules: {
        id: [
          {validator: idValidator, trigger: 'blur'}
        ],
        name: [
          {validator: nameValidator, trigger: 'blur'}
        ],
        desc: [
          {validator: descValidator, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    createRole () {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate(valid => {
          if (valid) {
            // this.form.createdAt = (new Date()).getTime()
            // this.form.createBy = '--'
            this.$store.dispatch('createRole', {
              id: 'superAdmin',
              name: '超级管理员',
              desc: '测试用'
            }).then(() => {
              resolve(this.form)
              return this.form
            }, () => {
              resolve(false)
              return false
            })
          } else {
            resolve(false)
            return false
          }
        })
      })
    },
    createAndConfig () {
      this.createRole().then((response) => {
        if (response) {
          this.cancelAndBack()
        }
      })
    },
    cancelAndBack () {
      this.$router.back(-1)
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