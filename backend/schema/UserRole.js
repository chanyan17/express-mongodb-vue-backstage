const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const UserRoleShema = new mongoose.Schema({
  userId: {
    type: ObjectId, // 关于某个用户，可以ObjectId拿到用户的其他字段
    ref: 'user'
  },
  roleId: {
    type: ObjectId, // 关于某个角色，可以ObjectId拿到角色的其他字段
    ref: 'role'
  }
}, {
  versionKey: false  // 查询数据库时，忽略 _v 的字段返回
})

UserRoleShema.statics = {
  // 插入一条账号角色记录
  insert (uid, rids) {
    if (rids && rids.length) {
      let ridsArray = []
      for (let i=0; i<rids.length; i++) {
        ridsArray.push({
          userId: uid,
          roleId: rids[i]
        })
      }
      return this.insertMany(ridsArray)
    } else {
      return Promise.reject('账号角色关系未选择')
    }
  },
  findAll (userId) {
    return this.find({
      userId: userId
    })
  },
  removeByUserId (uid) {
    return this.deleteMany({
      userId: uid
    })
  }
}

module.exports = mongoose.model('UserRole', UserRoleShema, 'userRole')