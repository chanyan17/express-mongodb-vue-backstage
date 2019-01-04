// 权限表
const mongoose = require('mongoose')

// 定义权限表结构
const FunctionsSchema = new mongoose.Schema({
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
    versionKey: false  // 查询数据库时，忽略 _v 的字段返回
})

FunctionsSchema.statics = {
    //  搜索权限列表
    findAll() {
        return this.find()
    },
    // 通过id搜索权限列表
    findOneById(id) {
        return this.findOne({ _id: id })
    },
    // 创建权限
    save(opts) {
        return this.create(opts)
    },
    // 通过id更新权限内容
    updateById(id, opts) {
        return this.update({
            _id: id
        }, opts).then(rs => {
            if (rs.ok) {
                return Promise.resolve()
            } else {
                return Promise.reject('数据库更新权限失败')
            }
        })
    },
    /// 通过id删除权限内容
    removeById(id) {
        return this.remove({
            _id: id
        })
    }
}

module.exports = mongoose.model('Functions', FunctionsSchema, 'functions')