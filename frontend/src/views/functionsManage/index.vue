<template>
  <div class="main-container">
    <div class="search-bar">
      <div class="item-input">
        <span class="label">权限名称</span>
        <el-input
          placeholder="请输入"
          v-model="functions">
        </el-input>
      </div>
      <div class="item-input">
        <el-button type="primary" icon="el-icon-search" :loading="false">搜索</el-button>
      </div>
      <el-button class="fr" type="primary" icon="el-icon-plus" @click="createFunctions()">新建权限</el-button>
    </div>
    <div class="result-list">
      <el-table
        :data="tableData"
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
            <el-button type="text" size="small">查看详情</el-button>
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      functions: '',
      tableData: [{
        name: '用户管理',
        authType: '目录',
        location: 'http://localhost:8080/#/functionsManage/index',
        authSign: 'system:jiagou:view',
        isDisplay: '可见',
        displayMode: '当前窗口',
        remark: '这个是给内部开发人员用的功能，不开放给用户'
      },
      {
        name: '用户管理',
        authType: '目录',
        location: 'http://localhost:8080/#/functionsManage/index',
        authSign: 'system:jiagou:view',
        isDisplay: '可见',
        displayMode: '当前窗口',
        remark: '这个是给内部开发人员用的功能，不开放给用户'
      }],
      currentPage: 1
    }
  },
  methods: {
    handleCurrentChange () {},
    createFunctions () {
      this.$router.push({path: '/functionsManage/create'})
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../styles/less/base.less';
</style>