// 角色表
const mongoose = require('mongoose')

// 定义角色表结构
const RoleSchema = new mongoose.Schema({
    name: String, // 角色名
    desc: String, // 角色描述
    createtBy: String, // 创建人
    createdAt: String // 创建时间
}, {
    versionKey: false  // 查询数据库时，忽略 _v 的字段返回
})

RoleSchema.statics = {
    // 搜索角色列表
    findAll() {
        return this.find()
    },
    // 通过id搜索角色列表
    findOneById(id) {
        return this.findOneById({
            _id: id
        })
    },
    // 创建角色
    save: function(opts) {
        return this.create(opts)
    },
    // 通过id更新角色
    updateById: function(id, opts) {
        return this.update({
            _id: id
        }, opts).then(rs => {
            if (rs.ok) {
                return Promise.resolve()
            } else {
                return Promise.reject('数据库更新角色名失败')
            }
        })
    },
    // 通过id删除角色
    removeById: function(id) {
        return this.remove({
            _id: id
        })
    }
}

module.exports = mongoose.model('Role', RoleSchema, 'role')