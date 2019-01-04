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
        <el-button type="primary" icon="el-icon-search" :loading="false">搜索</el-button>
      </div>
      <el-button class="fr" type="primary" icon="el-icon-plus" @click="createRole()">新建角色</el-button>
    </div>
    <div class="result-list">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        size="small">
        <el-table-column
          prop="rolename"
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
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">权限配置</el-button>
            <el-button type="text" size="small">删除</el-button>
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
      rolename: '',
      tableData: [{
        rolename: '学生',
        desc: 'xxxxxxx',
        createdAt: '2019-01-03',
        createdBy: 'admin'
      },
      {
        rolename: '学生',
        desc: 'xxxxxxx',
        createdAt: '2019-01-03',
        createdBy: 'admin'
      },
      {
        rolename: '学生',
        desc: 'xxxxxxx',
        createdAt: '2019-01-03',
        createdBy: 'admin'
      }],
      currentPage: 1
    }
  },
  methods: {
    handleCurrentChange () {},
    createRole () {
      this.$router.push({path: '/roleManage/create'})
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../styles/less/base.less';
</style>