<template>
  <div class="main-container">
    <div class="main">
      <div class="title">权限配置</div>
      <div class="form">
        <el-form label-width="0px" label-position="left" size="small">
          <div class="level" v-for="parentAuth in parentAuths" v-bind:key="parentAuth.id">
            <el-checkbox v-model="parentAuth.isChecked">{{parentAuth.name}}</el-checkbox>
            <div class="level-group" v-if="parentAuth.child.length">
                <span v-for="item in parentAuth.child" v-bind:key="item.id">
                  <el-checkbox v-model="item.isChecked">{{item.name}}</el-checkbox>
                </span>
            </div>
          </div>
          <div class="action">
            <el-button type="primary" @click="saveEditConfig()">保存配置</el-button>
            <el-button type="info" @click="cancelAndBack()">取消并返回</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      checkAll: false,
      parentAuths: [],
      checkedAuths: [],
      checked: true
    }
  },
  created () {
    this.roleId = this.$route.params.roleId
    this.getRoleAuth().then(() => {
      this.getAllAuth()
    })
  },
  methods: {
    getAllAuth () {
      this.$store.dispatch('getAllAuth').then(data => {
        console.log(data)
        if (data.length) {
          let parentAuths = []
          for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < this.checkedAuths.length; j++) {
              if (this.checkedAuths[j] === data[i].id) {
                data[i].isChecked = true
              }
            }

            if (data[i].parentId === '0') {
              parentAuths.push(data[i])
            }
          }
          this.parentAuths = parentAuths

          for (let i = 0; i < this.parentAuths.length; i++) {
            this.parentAuths[i].child = []
            for (let j = 0; j < data.length; j++) {
              if (this.parentAuths[i].id === data[j].parentId) {
                this.parentAuths[i].child.push(data[j])
              }
            }
          }
        }
      })
    },
    getRoleAuth () {
      return this.$store.dispatch('getRoleAuth', {
        roleId: this.roleId
      }).then(rs => {
        for (let i = 0; i < rs.length; i++) {
          if (rs[i].roleId === this.roleId) {
            this.checkedAuths.push(rs[i].authId)
          }
        }
      })
    },
    saveEditConfig () {
      this.$confirm('将进行更改权限配置, 确定继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let array = []
        for (let i = 0; i < this.parentAuths.length; i++) {
          if (this.parentAuths[i].isChecked) {
            array.push(this.parentAuths[i].id)
          }
          for (let j = 0; j < this.parentAuths[i].child.length; j++) {
            if (this.parentAuths[i].child[j].isChecked) {
              array.push(this.parentAuths[i].child[j].id)
            }
          }
        }
        this.$store.dispatch('configAuth', {
          id: this.roleId,
          authIds: array
        }).then(data => {
          this.$message({
            type: 'success',
            message: '更改成功!',
            onClose: this.cancelAndBack
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消更改'
        })
      })
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
.form {
  text-align: left;
}
.check-all {
  padding-bottom: 15px;
  text-align: left;
}
.level {
  padding: 15px 0;
  border-top: 1px solid #ebeef5;
  .level-group {
    margin-top: 15px;
    .el-checkbox {
      margin: 5px 0;
    }
  }
}
.el-checkbox {
  width: 115px;
  margin: 0;
}
.action {
  margin-top: 5px;
  text-align: center;
}
</style>