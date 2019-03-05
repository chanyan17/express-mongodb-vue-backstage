# vue-backstage

> 一个基于[vue](https://github.com/vuejs/vue) 和 [elementUI](https://github.com/ElemeFE/element)的管理后台。

## 依赖包
#### 安装[elementUI](http://element-cn.eleme.io/#/zh-CN)
```bash
npm install element-ui -S
```
* `main.js`import并use

#### 安装[normalize.css](http://necolas.github.io/normalize.css/)
```bash
npm install normalize.css -S
```

* `main.js`import

#### 安装[svg-sprite-loader](https://www.npmjs.com/package/svg-sprite-loader)
```bash
npm install svg-sprite-loader -S
```

* 新建文件夹`icons-svg`存放svg资源
* 新建文件`icons-index.js`引入模块
* 新建组件`components-Base-SvgIcon.vue`定义svg组件
* 添加并修改配置`webpack.base.conf.js`

#### 安装[less](http://lesscss.cn/)
```bash
npm install less less-loader --save-dev
```

* 添加配置`webpack.base.conf.js`

#### 安装[vuex](https://vuex.vuejs.org/zh-cn/)
```bash
npm install vuex --save
```

* 新建`store-index.js`,`store-getters.js`,`store-modules`文件和目录
* `store-index.js`创建实例
* `store-getters.js`vuex的getters集合
* `store-modules`vuex模块化
* `main.js`引入实例，在vue实例中加入配置

#### 安装[axios](https://www.kancloud.cn/yunye/axios/234845)
```bash
npm install axios -S
```
* 新建`utils-request.js`拦截器，对请求流程做处理
* 相关配置在`config-api.js`文件中
* `api-xx.js`为具体请求

#### 安装工具库[lodash](https://www.lodashjs.com/)
```bash
npm i --save lodash
```

### 安装vue-i18n，实现语言切换
```bash
npm i vue-i18n
```
## 路由搭建
* 登录页 - /login
* 主页 - /home
* 个人中心 - /userCenter
* 用户列表 - /userManage
* 角色列表 - /roleManage
* 权限列表 - /authManage

## 数据模拟&API接入
* 安装Mock.js
```bash
npm install mockjs --save-dev
```
* mock/*.js编写模拟数据
* mock/index.js拦截请求，返回对应模拟数据

## 前端跨域问题
`config/index.js`中`proxyTable`添加代理配置
```javascript
proxyTable: {
    '/v1': {
        target: 'http://192.168.0.107:3000',
        changeOrigin: true, // 允许跨域
        pathRewrite:{
            '^/v1':'/v1'
        }
    }
}
```
配置后，axios就不需再设置baseURL了