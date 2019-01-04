const express = require('express')

const router = express.Router()

const Role = require('../entity/Role')

const RoleFunction = require('../entity/RoleFunction')

const UserRole = require('../entity/UserRole')

var responseData

router.use((req,res,next) => {
    responseData = {
        ok: 0,
        msg: ''
    }
    next()
})

// 获取全部的角色（不分页）
router.get('/getRoles', (req, res, next) => {
    Role.findAll().then(rs => {
        responseData.data = rs
        responseData.msg = '查询角色数据列表成功'
        res.json(responseData)
    })
})
// 通过权限 _id 获取某个角色的详细信息
router.get('/getSubRole', (req, res, next) => {
   //一个角色对应多个权限，因此必须拿角色 _id 去查下权限列表
    Promise.all([
        Role.findOneById(req.query.rid),
        RoleFunction.findByRoleId(req.query.rid)
    ]).then(p => {
        responseData.data = {
            _id: p[0]._id,
            name: p[0].name,
            functionsIds: p[1].map(item => {
                return item.functionId
            })
        }
        res.json(responseData)
    })
})

// 新增 新的角色
router.post('/addRole', (req, res, next) => {
    let newRid
    Role.save({
        name: req.body.name
    }).then(rs => {
        newRid = rs._id
        // 一个角色对应多个权限，因此新增关系表
        return RoleFunction.insert(newRid, req.body.functionsIds)
    }).then(() => {
        responseData.msg = '新增角色保存成功'
        res.json(responseData)
    }).catch(error => {
        if (error === '角色权限关系未选择') {
            Role.removeById(newRid).then(() => {
                responseData.ok = 4
                responseData.msg = '角色没有选择对应的权限，保存失败'
                res.json(responseData)
            })
        } else {
            responseData.ok = 1
            responseData.msg = '新增角色保存失败'
            res.json(responseData)
        }
    })
})

// 更新 通过 _id 修改角色
router.put('/updateRole', (req, res, next) => {
    let rid = req.body._id
    // 一个角色对应多个权限，因此先删除旧的关系表
    RoleFunction.removeByRoleId(rid).then(() => {
        // 一个角色对应多个权限，因此更新关系表
        return RoleFunction.insert(rid, req.body.functionsIds)
    }).then(() => {
        return Role.updateById(rid, {
            name: req.body.name
        })
    }).then(() => {
        responseData.msg = '编辑角色保存成功'
        res.json(responseData)
    }).catch(error => {
        responseData.ok = 1
        responseData.msg = '编辑角色保存失败'
        res.json(responseData)
    })
})
// 删除 通过 _id 删除存在的角色
router.delete('/removeSubRole', (req, res, next) => {
    // 一个角色对应多个用户，因此先删除旧的关系表
    UserRole.removeByRoleId(req.query.rid).then(() => {
        return Role.removeById(req.query.rid)
    }).then(() => {
        responseData.msg = '删除角色成功'
        res.json(responseData)
    }).catch(() => {
        responseData.ok = 1
        responseData.msg = '删除角色失败'
        res.json(responseData)
    })
})
// 暴露角色路由接口
module.exports = router