const mongoose = require('mongoose')

// 定义schema: 指定字段名和类型
const UserSchema = new mongoose.Schema({
  // 用户名
  username: {type: String,  index: true},
  // 手机号
  mobile: {type: String},
  // 密码
  password: {type: String, default: '123456'},
  // 邮箱
  email: {type: String},
  // 性别
  sex: {type: String},
  // 状态
  status: {type: String, default: 'normal'},
  // 备注
  remark: {type: String}
}, {
  versionKey: false, //查询数据库时，忽略 _v 的字段返回
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})

UserSchema.statics = {
  // 创建用户
  save (opts) {
    return this.create(opts)
  },
  // 搜索列表
  findAll (pageSize, skipCount) {
    if (pageSize) {
      return this.find({}).limit(pageSize).skip(skipCount).sort({ id: -1 })
    } else {
      return this.find({}).count()
    }
  },
  // 搜索
  findByOpts (opts, pageSize, skipCount) {
    if (opts.name) {
      opts.name = {'$regex': opts.name, $options: '$i'}
    }
    if (pageSize) {
      return this.find(opts).limit(pageSize).skip(skipCount).sort({ id: -1 })
    } else {
      return this.find(opts).count()
    }
  },
  // 详情
  findById (id) {
    return this.findOne({
      _id: id
    }, {
      _id: 0
    })
  },
  // 更新用户信息
  updateById (id, opts) {
    return this.updateOne({
      _id: id
    }, opts)
  },
  // 注销账号
  removeById (id) {
    return this.removeOne({
      userId: id
    })
  }
}

/**
  * 生成Model
  * 参数一要求与 Model 名称一致
  * 参数二为 Schema
  * 参数三为映射到 MongoDB 的 Collection 名
**/
module.exports = mongoose.model('User', UserSchema, 'user')