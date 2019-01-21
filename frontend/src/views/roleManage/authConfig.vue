<template>
  <div class="main-container">
    <div class="main">
      <div class="title">权限配置</div>
      <div class="form">
        <el-form label-width="0px" label-position="left" size="small">
          <el-checkbox class="check-all" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <div class="level" v-for="parentAuth in parentAuths" v-bind:key="parentAuth.id">
            <el-checkbox v-model="parentAuth.is_checked" :label="parentAuth.name" @change="handleCheckedCitiesChange">{{parentAuth.name}}</el-checkbox>
            <div class="level-group" v-if="parentAuth.child.length">
              <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="item in parentAuth.child" :label="item.name" :key="item.id">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="action">
            <el-button type="primary" @click="createAndConfig()">保存配置</el-button>
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
      checkedCities: [],
      isIndeterminate: true
    }
  },
  created () {
    this.getAllAuth()
  },
  methods: {
    getAllAuth () {
      this.$store.dispatch('getAllAuth').then(data => {
        if (data.length) {
          let parentAuths = []
          for (let i = 0; i < data.length; i++) {
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
      // this.$store.dispatch('')
    },
    handleCheckAllChange (val) {
      // this.checkedCities = val ? cityOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
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