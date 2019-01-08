const mongoose = require('mongoose')

const RoleSchema = new mongoose.Schema({
    id: {type: String, required: true, unique: true, dropDups:true }, // 标识
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
    console.log(opts)
    return this.create(opts)
  },
  // 搜索角色列表
  findAll () {
    return this.find()
  },
  // 通过id搜索角色列表
  findOneById (id) {
    return this.findOneById({
      _id: id
    })
  },
  // 通过id更新角色
  updateById (id, opts) {
    return this.update({
      _id: id
    }, opts).then(rs => {
      if (!rs.ok) {
          return Promise.resolve()
      } else {
          return Promise.reject('数据库更新角色失败')
      }
    })
  },
  // 通过id删除角色
    removeById (id) {
      return this.remove({
          _id: id
      })
    }
}

module.exports = mongoose.model('Role', RoleSchema, 'role')