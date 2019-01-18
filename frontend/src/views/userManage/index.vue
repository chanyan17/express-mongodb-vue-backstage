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
        <span class="label">状态</span>
        <el-select v-model="status" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="item-input">
        <el-button type="primary" icon="el-icon-search" :loading="false">搜索</el-button>
      </div>
      <el-button class="fr" type="primary" icon="el-icon-plus" @click="createUser()">新建用户</el-button>
    </div>
    <div class="result-list">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        size="small">
        <el-table-column
          label="头像"
          width="120">
          <template slot-scope="scope">
            <img :src="scope.row.portrait" width="30" height="30" class="portrait"/>
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
          prop="rolename"
          label="角色"
          width="250">
          <template slot-scope="scope">
            <el-tag size="medium" class="role" v-for="(item, index) in scope.row.rolename" v-bind:key="index">{{ item }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注">
        </el-table-column>
        <el-table-column
          label="状态"
          width="150">
          <template slot-scope="scope">
              <el-tag type="success" size="medium">正常</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="220">
          <template slot-scope="scope">
            <el-button @click="editUser(scope.row.id)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="prohibiteUser()">禁用</el-button>
            <el-button type="text" size="small" @click="unusableUser()">停用</el-button>
            <!-- <el-button type="text" size="small" @click="normalUser()">恢复正常</el-button> -->
            <el-button type="text" size="small" @click="resetPwd()">重置密码</el-button>
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
export default {
  data () {
    return {
      username: '',
      status: '',
      options: [
        {
          value: 'normal',
          label: '正常'
        },
        {
          value: 'unusable',
          label: '停用'
        },
        {
          value: 'prohibite',
          label: '禁用'
        }
      ],
      tableData: [{
        portrait: 'http://temp.im/30x30',
        username: '陈一一',
        rolename: ['校领导', '老师'],
        mobile: '13560123456',
        remark: '上海市普陀区金沙江路 1518 弄'
      }, {
        portrait: 'http://temp.im/30x30',
        username: '陈一一',
        mobile: '13560123456',
        rolename: ['校领导', '老师'],
        remark: '上海市普陀区金沙江路 1517 弄'
      }, {
        portrait: 'http://temp.im/30x30',
        username: '陈一一',
        mobile: '13560123456',
        rolename: ['校领导', '老师'],
        remark: '上海市普陀区金沙江路 1519 弄'
      }, {
        portrait: 'http://temp.im/30x30',
        username: '陈一一',
        rolename: ['校领导', '老师'],
        mobile: '13560123456',
        remark: '上海市普陀区金沙江路 1516 弄'
      }],
      currentPage: 1
    }
  },
  methods: {
    createUser () {
      this.$router.push({
        path: '/userManage/create'
      })
    },
    editUser (userId) {
      this.$router.push({
        path: '/userManage/edit/:userId',
        params: {userId: userId}
      })
    },
    prohibiteUser () {
      this.$confirm('此操作将禁用该用户, 确定继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '禁用成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消禁用'
        })
      })
    },
    unusableUser () {
      this.$confirm('此操作将停用该用户, 确定继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '停用成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消停用'
        })
      })
    },
    normalUser () {
      this.$confirm('此操作将恢复该用户正常, 确定继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '恢复正常!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消恢复'
        })
      })
    },
    resetPwd () {
      this.$confirm('此操作将重置密码为123456, 确定继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '重置成功!'
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