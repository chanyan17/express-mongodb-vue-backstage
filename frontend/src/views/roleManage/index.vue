<template>
  <div class="main-container">
    <div class="search-bar">
      <div class="item-input">
        <span class="label">角色</span>
        <el-input
          placeholder="请输入"
          v-model="rolename">
        </el-input>
      </div>
      <div class="item-input">
        <el-button type="primary" icon="el-icon-search" :loading="false" @click="search()">搜索</el-button>
      </div>
      <el-button class="fr" type="primary" icon="el-icon-plus" @click="createRole()">新建角色</el-button>
    </div>
    <div class="result-list">
      <el-table
        :data="roleList"
        stripe
        style="width: 100%"
        size="small">
        <el-table-column
          prop="name"
          label="角色名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="desc"
          label="角色描述">
        </el-table-column>
        <el-table-column
          prop="createdBy"
          label="创建人"
          width="150">
        </el-table-column>
        <el-table-column
          prop="createdAt"
          label="创建时间"
          width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.createdAt | dateFormat('yyyy-MM-dd hh:mm') }}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editRole(scope.row.id)">编辑</el-button>
            <el-button type="text" size="small" @click="configAuth(scope.row.id)">权限配置</el-button>
            <el-button type="text" size="small" @click="deleteRole(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="total, prev, pager, next, jumper"
          :total="roleTotalCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      rolename: '',
      pageSize: 10,
      currentPage: 1
    }
  },
  created () {
    this.getRoleList()
  },
  computed: {
    ...mapGetters([
      'roleList',
      'roleTotalCount'
    ])
  },
  methods: {
    search () {
      this.currentPage = 1
      this.getRoleList()
    },
    getRoleList () {
      this.$store.dispatch('getRoleList', {
        perPage: this.pageSize,
        page: this.currentPage,
        keyword: this.rolename
      })
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getRoleList()
    },
    createRole () {
      this.$router.push({path: '/roleManage/create'})
    },
    editRole (roleId) {
      this.$router.push({path: '/roleManage/edit/' + roleId})
    },
    configAuth (roleId) {
      this.$router.push({path: '/roleManage/authConfig/' + roleId})
    },
    deleteRole (roleId) {
      this.$confirm('确定删除该角色?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('deleteRole', {
          id: roleId
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