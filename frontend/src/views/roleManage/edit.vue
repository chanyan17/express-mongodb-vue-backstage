<template>
  <div class="main-container">
    <div class="main">
      <div class="title">编辑角色</div>
      <div class="form">
        <el-form ref="form" :model="form" :rules="formRules" label-width="80px" label-position="left" size="small">
          <el-form-item label="角色标识" prop="key">
            <el-input v-model="form.key"></el-input>
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
          <el-form-item label="创建人" prop="createdBy">
            <el-input v-model="form.createdBy"></el-input>
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
export default {
  data () {
    const keyValidator = (rule, value, callback) => {
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
      form: {},
      formString: '',
      roleId: 0,
      formRules: {
        key: [
          {validator: keyValidator, trigger: 'blur'}
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
  created () {
    this.roleId = this.$route.params.roleId
    this.getInitData()
  },
  methods: {
    getInitData () {
      this.$store.dispatch('getRoleDetail', {
        id: this.roleId
      }).then(data => {
        this.form = data
        for (let i in this.form) {
          this.formString += this.form[i]
        }
      })
    },
    saveEdit () {
      let str = ''
      for (let i in this.form) {
        str += this.form[i]
      }

      if (str === this.formString) {
        this.cancelAndBack()
      } else {
        this.form.id = this.roleId
        this.$store.dispatch('updateRole', this.form).then(data => {
          this.cancelAndBack()
        })
      }
    },
    cancelAndBack () {
      this.$router.push({path: '/roleManage/index'})
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