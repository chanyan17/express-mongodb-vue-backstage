const mongoose = require('mongoose')

// 定义schema: 指定字段名和类型
const UserSchema = new mongoose.Schema({
  // 用户名
  username: {type: String,  index: true},
  // 手机号
  mobile: {type: String},
  // 密码
  password: {type: String, default: '123456'},
  // 角色
  roles: {type: Array, default: []}
}, {
  versionKey: false  //查询数据库时，忽略 _v 的字段返回
})

UserSchema.statics = {
  // 创建用户
  save (opts) {
    return this.create(opts)
  }
}

/**
  * 生成Model
  * 参数一要求与 Model 名称一致
  * 参数二为 Schema
  * 参数三为映射到 MongoDB 的 Collection 名
**/
module.exports = mongoose.model('User', UserSchema, 'userInfo')