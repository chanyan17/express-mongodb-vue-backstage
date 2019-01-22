<template>
  <div class="main-container">
    <div class="search-bar">
      <div class="item-input">
        <span class="label">用户名</span>
        <el-input
          placeholder="请输入"
          v-model="username">
        </el-input>
      </div>
      <div class="item-input">
        <el-button type="primary" icon="el-icon-search" :loading="false" @click="search()">搜索</el-button>
      </div>
      <el-button class="fr" type="primary" icon="el-icon-plus" @click="createUser()">新建用户</el-button>
    </div>
    <div class="result-list">
      <el-table
        :data="userList"
        stripe
        style="width: 100%"
        size="small">
        <el-table-column
          label="头像"
          width="120">
          <template slot-scope="scope">
            <img :src="scope.row.portrait || defaultPortrait[scope.row.sex]" width="30" height="30" class="portrait"/>
          </template>
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          width="150">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号"
          width="180">
        </el-table-column>
        <el-table-column
          label="状态"
          width="150">
          <template slot-scope="scope">
              <el-tag :type="typeMap[scope.row.status]" size="medium">{{ statusMap[scope.row.status] }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="220">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status == 'normal'" @click="editUser(scope.row.id)" type="text" size="small">编辑</el-button>
            <el-button v-if="scope.row.status != 'prohibite'" type="text" size="small" @click="prohibiteUser(scope.row.id)">禁用</el-button>
            <el-button v-if="scope.row.status == 'normal'" type="text" size="small" @click="unusableUser(scope.row.id)">停用</el-button>
            <el-button v-if="scope.row.status != 'normal'" type="text" size="small" @click="normalUser(scope.row.id)">恢复正常</el-button>
            <el-button v-if="scope.row.status == 'normal'" type="text" size="small" @click="resetPwd(scope.row.id)">重置密码</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="total, prev, pager, next, jumper"
          :total="400">
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
      defaultPortrait: {
        male: require('@/assets/male.png'),
        female: require('@/assets/female.png')
      },
      username: '',
      pageSize: 10,
      currentPage: 1,
      roleMap: {},
      typeMap: {
        normal: 'success',
        unusable: 'info',
        prohibite: 'danger'
      }
    }
  },
  created () {
    this.getRoleList().then(() => {
      this.roleList.map(item => {
        this.roleMap[item.id] = item.name
      })
    })
    this.getUserList()
  },
  computed: {
    ...mapGetters([
      'roleList',
      'userList',
      'userTotalCount',
      'statusMap'
    ])
  },
  methods: {
    getRoleList () {
      return this.$store.dispatch('getRoleList', {})
    },
    getUserList () {
      this.$store.dispatch('getUserList', {
        perPage: this.pageSize,
        page: this.currentPage,
        keyword: this.username
      })
    },
    search () {
      this.currentPage = 1
      this.getUserList()
    },
    createUser () {
      this.$router.push({
        path: '/userManage/create'
      })
    },
    editUser (userId) {
      this.$router.push({
        path: '/userManage/edit/' + userId,
        params: {userId: userId}
      })
    },
    prohibiteUser (userId) {
      this.$confirm('此操作将禁用该用户, 确定继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('prohibiteUser', {
          id: userId
        }).then(() => {
          this.search()
          this.$message({
            type: 'success',
            message: '禁用成功!'
          })
        })
      }).catch((error) => {
        this.$message({
          type: 'info',
          message: '禁用失败' + error
        })
      })
    },
    unusableUser (userId) {
      this.$confirm('此操作将停用该用户, 确定继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('unusableUser', {
          id: userId
        }).then(() => {
          this.search()
          this.$message({
            type: 'success',
            message: '停用成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消停用'
        })
      })
    },
    normalUser (userId) {
      this.$confirm('此操作将恢复该用户正常, 确定继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('normalUser', {
          id: userId
        }).then(() => {
          this.search()
          this.$message({
            type: 'success',
            message: '恢复正常!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消恢复'
        })
      })
    },
    resetPwd (userId) {
      this.$confirm('此操作将重置密码为123456, 确定继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('resetPwd', {
          id: userId
        }).then(() => {
          this.search()
          this.$message({
            type: 'success',
            message: '重置成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消重置'
        })
      })
    },
    handleCurrentChange () {}
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/less/base.less';
  .result-list {
    .portrait {
      border-radius: 50%;
    }

    .role {
      margin-right: 5px;
    }
  }
</style>