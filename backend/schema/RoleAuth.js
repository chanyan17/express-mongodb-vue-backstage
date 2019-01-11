// 角色权限表
const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

// 定义角色权限表
const RoleAuthSchema = new mongoose.Schema({
  roleId: {
    type: ObjectId,
    ref: 'role'
  },
  authId: {
    type: ObjectId,
    ref: 'auth'
  }
}, {
    versionKey: false,  // 查询数据库时，忽略 _v 的字段返回
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})

RoleAuthSchema.statics = {
  // 插入一条角色权限记录
  insert (rid, aids) {
    if (aids && aids.length) {
      let aidsArray = []
      for (let i=0; i<aids.length; i++) {
        aidsArray.push({
          roleId: rid,
          authId: aids[i]
        })
      }
      return this.insertMany(aidsArray)
    } else {
      return Promise.reject('角色权限关系未选择')
    }
  },
  // 通过角色id获取角色权限信息
  findById (rid) {
    return this,findById({
      roleId: rid
    })
  },
  // 通过角色id删除角色权限信息
  removeByRoleId: function(rid) {
    return this.deleteMany({ roleId: rid })
  },
  // 通过权限id删除角色权限信息
  removeByAuthId: function(aid) {
    return this.deleteOne({ authId: aid })
  }
}

module.exports = mongoose.model('RoleAuth', RoleAuthSchema, 'roleAuth')