// 用户表
const mongoose = require('mongoose')

// 定义用户表结构
const UserSchema = new mongoose.Schema({
    portrait: String, // 头像地址
    name: String, // 用户名
    pwd: String, // 密码
    mobile: String, // 手机号
    sex: String, // 性别 male female
    status: String, // 状态 normal unusable prohibite
    createdAt: Date, // 注册时间
    remark: String // 备注
}, {
    versionKey: false  // 查询数据库时，忽略 _v 的字段返回
})
// 为模式添加静态方法，不会与数据库进行交互，只有在模型实例化编译后产生作用
// 通过模型调取
UserSchema.statics = {
    // 创建用户
    save(opts) {
        return this.create(opts)
    },
    // 通过id更新用户信息
    updateById(id, opts) {
        return this.update({
            _id: id
        }, opts).then(rs => {
            if ( !rs.ok ) {
                return Promise.resolve()
            } else {
                return Promise.reject('数据库更新用户信息失败')
            }
        })
    },
    // 通过id删除用户
    removeById(id) {
        return this.remove({
            _id: id
        })
    },
    // 通过用户id来查找
    findOneById(uid) {
        return this.findOne({
            _id: uid
        })
    },
    // 通过用户名，密码查找用户
    findUser(username, userpwd) {
        return this.findOne({
            name: username,
            pwd: userpwd
        })
    },
    // 获取用户列表
    findAll() {
        return this.find()
    }
}

module.exports = mongoose.model('User', UserSchema, 'user')