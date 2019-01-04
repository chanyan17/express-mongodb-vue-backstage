// 角色权限表
const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

// 定义角色权限表
const RoleFunctionSchema = new mongoose.Schema({
    roleId: {
        type: ObjectId, // 关于某个角色，可以ObjectId拿到角色的其他字段
        ref: 'role'
    },
    functionId: {
        type: ObjectId, // 关于某个权限，可以ObjectId拿到权限的其他字段
        ref: 'functions'
    }
}, {
    versionKey: false  // 查询数据库时，忽略 _v 的字段返回
})

RoleFunctionSchema.statcs = {
    // 通过角色id获取角色信息
    findById(rid) {
        return this.findById({
            roleId: rid
        })
    },
    // 通过角色id获取权限信息
    getFunctionByRoleId(rid) {
        return this.find({
            roleId: rid
        }, {
            roleId: 0,
            _id: 0
        }).populate({
            path: 'functions',
            select: { name: 1, parentId: 1, location: 1 }
        }).then(farr => {
            let farray = farr.map(item => {
                return item.functionId
            })
            return Promise.resolve(farray)
        }).catch(err => {
            return Promise.reject()
        })
    },
    // 插入一条角色权限信息
    insert: function(rid, fids) {
        if (fids && fids.length) {
            let fidsArray = []
            for(let i = 0;i < fids.length; i++) {
                fidsArray.push({
                    roleId: rid, functionId: fids[i]
                })
            }
            return this.insertMany(fidsArray)
        } else {
            return Promise.reject('角色权限关系未选择')
        }
    },
    // 通过角色id删除角色权限信息
    removeByRoleId: function(rid) {
        return this.remove({ roleId: rid })
    },
    // 通过权限id删除角色权限信息
    removeByFunId: function(fid) {
        return this.remove({ functionId: fid })
    }
}

module.exports = mongoose.model('RoleFunction', RoleFunctionSchema, 'roleFunction')