<template>
  <div class="main-container">
    <div class="search-bar">
      <div class="item-input">
        <span class="label">权限名称</span>
        <el-input
          placeholder="请输入"
          v-model="auth">
        </el-input>
      </div>
      <div class="item-input">
        <el-button type="primary" icon="el-icon-search" :loading="isSearching" @click="search()">搜索</el-button>
      </div>
      <el-button class="fr" type="primary" icon="el-icon-plus" @click="createAuth()">新建权限</el-button>
    </div>
    <div class="result-list">
      <el-table
        :data="authList"
        stripe
        style="width: 100%"
        size="small">
        <el-table-column
          prop="name"
          label="权限名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="authType"
          label="权限类型"
          width="120">
          <template slot-scope="scope">
            <el-tag size="medium">{{authTypeMap[scope.row.authType]}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="location"
          label="请求地址">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          width="300">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="getDetail(scope.row.id)">查看详情</el-button>
            <el-button type="text" size="small" @click="editAuth(scope.row.id)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteAuth(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="authTotalCount">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      isSearching: false,
      auth: '',
      pageSize: 10,
      currentPage: 1
    }
  },
  created () {
    this.getInitData()
  },
  computed: {
    ...mapGetters([
      'authTypes',
      'authTypeMap',
      'authList',
      'authTotalCount'
    ])
  },
  methods: {
    getInitData () {
      this.$store.dispatch('getAuthList', {
        perPage: this.pageSize,
        page: this.currentPage
      })
    },
    search () {
      this.isSearching = true
      this.$store.dispatch('getAuthList', {
        perPage: this.pageSize,
        page: this.currentPage,
        keyword: this.auth
      }).then(() => {
        this.isSearching = false
      })
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.search()
    },
    createAuth () {
      this.$router.push({path: '/authManage/create'})
    },
    getDetail (authId) {
      this.$router.push({path: '/authManage/detail/' + authId})
    },
    editAuth (authId) {
      this.$router.push({path: '/authManage/edit/' + authId})
    },
    deleteAuth (authId) {
      this.$confirm('确定删除该权限?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('deleteAuth', {
          id: authId
        }).then(() => {
          this.search()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../styles/less/base.less';
</style>