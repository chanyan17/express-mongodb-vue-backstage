// 权限表
const mongoose = require('mongoose')

// 定义权限表结构
const AuthSchema = new mongoose.Schema({
  name: String, // 权限名称
  parentId: { // 上级权限_id
    type: String,
    default: 0
  },
  authType: String, // 权限类型 catalog menu button
  location: String, // 请求地址
  authSign: String, // 授权标识
  displayMode: String, // 展示方式 currentWindow newwindow dialogWindow browserWindow
  isDisplay: Boolean, // 是否显示
  remark: String // 备注
}, {
  versionKey: false,  // 查询数据库时，忽略 _v 的字段返回
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})

AuthSchema.statics = {
  // 新建权限
  save (opts) {
    return this.create(opts)
  },

  // 通过name和parentId搜索权限
  findByNameAndParentId (name, parentId) {
    return this.find({
      name: name,
      parentId: parentId
    })
  },

  // 通过parentId=0搜索顶层菜单
  findParentAuth () {
    return this.find({
      parentId: 0
    }, {
      _id: 1,
      name: 1
    })
  },

  // 搜索全部
  search (pageSize, skipCount) {
    if (pageSize) {
      return this.find({}).limit(pageSize).skip(skipCount).sort({ id: -1 })
    } else {
      return this.find({}).count()
    }
  },

  findAll () {
    return this.find()
  },

  // 通过权限名称模糊搜索
  findByName (name, pageSize, skipCount) {
    if (pageSize) {
      return this.find({
      name: {'$regex': name, $options: '$i'}
    }).limit(pageSize).skip(skipCount).sort({ id: -1 })
    } else {
      return this.find({
      name: {'$regex': name, $options: '$i'}
    }).count()
    }
  },

  // 通过_id获取详情
  // 要使用_id，则需要使用findById语句，而不能使用find或findOne语句
  findById (id) {
    return this.findOne({
      _id: id
    }, {
      _id: 0
    })
  },

  // 更新权限
  updateById (id, opts) {
    return this.updateOne({
      _id: id
    }, opts)
  },

  // 删除权限
  removeById (id) {
    return this.deleteOne({
      _id: id
    })
  }
}

module.exports = mongoose.model('Auth', AuthSchema, 'auth')