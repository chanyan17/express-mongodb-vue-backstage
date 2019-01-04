const express = require('express')

const router = express.Router()

const User = require('../entity/User')

const UserRole = require('../entity/UserRole')

const RoleFunction = require('../entity/RoleFunction')

var responseData

// 设置接口输出前统一重置的统一返回字段
router.use((req, res, next) => {
    responseData = {
        ok: 0,
        msg: ''
    }
    next()
})

// 处理登录接口
router.post('/login', (req, res, next) => {
    let currentUser
    User.findUser(req.body.loginName, req.body.loginPwd).then(_user => {
        if (_user) {
            currentUser = {
                _id: _user._id, name: _user.name
            }
            // 一个用户对应多个角色，因此必须拿用户 _id 去查下角色列表
            return UserRole.findAll({
                userId: _user._id
            })
        } else {
            return Promise.reject()
        }
    }).then(rs => {
        currentUser.roles = rs
        if (rs.length) {
            let rsPromise = rs.map(rid => {
                // 一个角色对应多个权限，因此必须拿角色 _id 去查下权限列表
                return RoleFunction.getFunEntityByRoleId(rid)
            })
            return Promise.all(rsPromise)
        } else {
            return Promise.resolve()
        }
    }).then(rp => {
        let newRP = new Array()
        if (rp) {
            let newRPId = new Array()
            rp.forEach(ritem => {
                ritem.forEach(rsub => {
                    let rIndex = newRPId.findIndex(id => {
                        return String(id) === String(rsub._id)
                    })
                    if (rIndex === -1) {
                        newRPId.push(rsub._id)
                        newRP.push(rsub)
                    }
                })
            })
        }
        currentUser.functions = newRP
        responseData.data = currentUser
        responseData.msg = '用户登录成功'
        res.json(responseData)
    }).catch(err => {
        responseData.ok = 1
        responseData.msg = '用户登录失败'
        res.json(responseData)
    })
})
// 获取全部的用户（不分页）
router.get('/getUsers', (req, res, next) => {
    let users = new Array()
    User.findAll().then(us => {
        users = us
        let getUserRoles = us.map(u => {
            // 一个用户对应多个角色，因此必须拿用户 _id 去查下角色列表
            return UserRole.findAll({
                userId: u._id
            })
        })
        return Promise.all(getUserRoles)
    }).then(urray => {
        responseData.data = users.map((item, iIndex) => {
            return {
                _id: item._id, name: item.name, pwd: item.pwd, roles: urray[iIndex]
            }
        })
        responseData.msg = '查询用户数据列表成功'
        res.json(responseData)
    }).catch(error => {
        responseData.ok = 1
        responseData.msg = '查询用户数据列表失败'
        res.json(responseData)
    })
})
// 通过用户 _id 获取某个用户以及其角色的详细信息
router.get('/getSubUser', (req, res, next) => {
    Promise.all([
        User.findOneById(req.query.uid),
        UserRole.findAll({
            userId: req.query.uid
        })
    ]).then(p => {
        responseData.data = {
            _id: p[0]._id, name: p[0].name, pwd: p[0].pwd, roles: p[1]
        }
        res.json(responseData)
    }).catch(error => {
        responseData.ok = 1
        responseData.msg = '获取用户信息失败'
        res.json(responseData)
    })
})

// 新增用户
router.post('/addUser', (req, res, next) => {
    let newUid
    User.save({
        name: req.query.name,
        pwd: req.query.pwd,
        mobile: req.query.mobile,
        sex: req.query.sex
    }).then(rs => {
        newUid = rs._id
        //一个用户对应多个角色，因此新增关系表
        return UserRole.insert(newUid, req.body.roleIds)
    }).then(() => {
        responseData.msg = '新增用户保存成功'
        res.json(responseData)
    }).catch(error => {
        if (error === '用户角色关系未选择') {
            User.removeById(newUid).then(() => {
                responseData.ok = 4
                responseData.msg = '用户没有选择对应的角色，保存失败'
                res.json(responseData)
            })
        } else {
            responseData.ok = 1
            responseData.msg = '新增用户保存失败'
            res.json(responseData)
        }
    })
})
// 更新 通过 _id 修改用户
router.put('/updateUser', (req, res, next) => {
    let uid = req.body._id
    // 一个用户对应多个角色，因此先删除旧的关系表
    UserRole.removeByUserId(uid).then(() => {
        //一个用户对应多个角色，因此更新关系表
        return UserRole.insert(uid, req.body.roleIds)
    }).then(() => {
        return User.updateById(uid, {
            name: req.body.name,
            pwd: req.body.pwd
        })
    }).then(() => {
        responseData.msg = '编辑用户保存成功'
        res.json(responseData)
    }).catch(error => {
        responseData.ok = 1
        responseData.msg = '编辑用户保存失败'
        res.json(responseData)
    })
})
// 删除 通过 _id 删除存在的用户
router.delete('/removeSubUser', (req, res, next) => {
    //一个用户对应多个角色，因此先删除旧的关系表
    UserRole.removeByUserId(req.query.uid).then(() => {
        return User.removeById(req.query.uid)
    }).then(() => {
        responseData.msg = '删除用户成功'
        res.json(responseData)
    }).catch(() => {
        responseData.ok = 1
        responseData.msg = '删除用户失败'
        res.json(responseData)
    })
})
// 暴露用户路由接口
module.exports = router