const mongoose = require('mongoose')

const RoleSchema = new mongoose.Schema({
    key: {type: String, required: true, unique: true, dropDups:true }, // 标识
    name: {type: String, required: true }, // 角色名
    desc: String, // 角色描述
    createdBy: {type: String, default: '-'} // 创建人
}, {
    versionKey: false,  // 查询数据库时，忽略 _v 的字段返回
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})

RoleSchema.statics = {
  // 创建角色
  save (opts) {
    return this.create(opts)
  },
  // 搜索角色列表
  findAll (pageSize, skipCount) {
    if (pageSize) {
      return this.find({}).limit(pageSize).skip(skipCount).sort({ id: -1 })
    } else {
      return this.find({}).count()
    }
  },
  // 通过_id搜索角色详情
  findById (id) {
    return this.findOne({
      _id: id
    }, {
      _id: 0
    })
  },
  // 通过keyword搜索角色列表
  findByKeyword (keyword, pageSize, skipCount) {
    const reg = new RegExp(keyword, 'i')
    if (pageSize) {
      return this.find({
        $or: [
          {key: {$regex : reg}},
          {name: {$regex : reg}}
        ]
      }).limit(pageSize).skip(skipCount).sort({ id: -1 })
    } else {
      return this.find({
        $or: [
          {key: {$regex : reg}},
          {name: {$regex : reg}}
        ]
      }).countDocuments()
    }
  },
  // 通过id更新角色
  updateById (id, opts) {
    return this.update({
      _id: id
    }, opts)
  },
  // 通过id删除角色
  removeById (id) {
    return this.deleteOne({
        _id: id
    })
  }
}

module.exports = mongoose.model('Role', RoleSchema, 'role')