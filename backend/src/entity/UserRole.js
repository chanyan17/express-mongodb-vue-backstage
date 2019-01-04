// 用户角色表
const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

// 定义用户角色表结构
const UserRoleSchema = new mongoose.Schema({
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

UserRoleSchema.statics = {
    findAll(opts) {
        let ingore = {_id: 0}
        let selPop = {}
        if (opts.userId) {
            ingore.userId = 0
            selPop = {
                path: 'roleId',
                select: {name: 1}
            }
        }
        if (opts.roleId) {
            ingore.roleId = 0
            selPop = {
                path: 'userId', select: { name: 1, pwd: 1 }
            }
        }
        return this.find(opts, ingore).populate(selPop).then(urray => {
            if (urray.length) {
                urray = urray.map(item => {
                    if (opts.userId) {
                        return item.roleId
                    }
                    if (opts.roleId) {
                        return item.userId
                    }
                })
            }
            return Promise.resolve(urray)
        }).catch(err => {
            return Promise.reject()
        })
    },
    insert: function(uid, rids) {
        if (rids && rids.length) {
            let ridsArray = []
            for(let i = 0;i < rids.length; i++) {
                ridsArray.push({
                    userId: uid, roleId: rids[i]
                })
            }
            return this.insertMany(ridsArray)
        } else {
            return Promise.reject('用户角色关系未选择')
        }
    },
    removeByUserId: function(uid) {
        return this.remove({ userId: uid })
    },
    removeByRoleId: function(rid) {
        return this.remove({ roleId: rid })
    }
}

module.exports = mongoose.model('UserRole', UserRoleSchema, 'userRole')