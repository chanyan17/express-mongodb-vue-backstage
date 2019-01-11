<template>
  <div class="main-container">
    <div class="main">
      <div class="title">新建权限</div>
      <div class="form">
        <el-form ref="form" :model="form" label-width="120px" label-position="left" size="small">
          <el-form-item label="权限名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="父层权限名称">
            <el-select v-model="form.parentId" placeholder="请选择">
              <el-option
                v-for="item in parentFunctions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="权限类型">
            <el-radio-group v-model="form.authType">
              <el-radio-button label="catalog">目录</el-radio-button>
              <el-radio-button label="menu">菜单</el-radio-button>
              <el-radio-button label="button">按钮</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="请求地址">
            <el-input v-model="form.location"></el-input>
          </el-form-item>
          <el-form-item label="权限标识">
            <el-input v-model="form.authSign"></el-input>
          </el-form-item>
          <el-form-item label="连接目标">
            <el-select v-model="form.displayMode" placeholder="请选择">
              <el-option
                v-for="item in displayModes"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="可见状态">
              <el-radio-group v-model="form.isDisplay">
                <el-radio-button label="true">可见</el-radio-button>
                <el-radio-button label="false">不可见</el-radio-button>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="form.remark"
              :autosize="{ minRows: 2, maxRows: 4}"
              resize="none">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">新建权限</el-button>
            <el-button type="info">取消并返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        name: '',
        authType: 'menu',
        parentId: '',
        location: '',
        authSign: '',
        displayMode: '',
        isDisplay: true
      },
      parentFunctions: [{
        id: '0',
        name: '无'
      }, {
        id: '123456',
        name: '用户列表'
      }],
      displayModes: [{
        id: 'currentWindow',
        name: '当前窗口'
      }, {
        id: 'newwindow',
        name: '新窗口/新标签'
      }, {
        id: 'dialogWindow',
        name: '弹出窗口'
      }, {
        id: 'browserWindow',
        name: '弹出浏览器窗口'
      }]
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../styles/less/base.less';
.el-form-item {
  text-align: left;
}
.el-select {
  width: 100%;
}
</style>