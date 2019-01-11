const express = require('express')
const router = express.Router()

const User = require('../../schema/User')
const UserRole = require('../../schema/UserRole')

var responseData

// 设置接口输出前统一重置的统一返回字段
router.use((req, res, next) => {
    responseData = {
        ok: 0,
        msg: ''
    }
    next()
})

router.post('/create', (req, res, next) => {
  User.findByOpts({
    mobile: req.body.mobile
  }).then(rs => {
    if (!rs) {
      User.findByOpts({
        email: req.body.email
      }).then(rs => {
        if (!rs) {
          User.save({
            username: req.body.username,
            mobile: req.body.mobile,
            password: req.body.password,
            email: req.body.email,
            sex: req.body.sex,
            remark: req.body.remark
          }).then(rs => {
            UserRole.insert(rs._id, req.body.roleIds).then(rs => {
              responseData.msg = '新增用户保存成功'
              res.json(responseData)
            })
          }).catch(error => {
            if (error === '账号角色关系未选择') {
              User.removeById(rs._id).then(rs => {
                responseData.ok = 1
                responseData.msg = '角色没有选择对应的权限，新建失败'
                res.json(responseData)
              })
            } else {
              responseData.ok = 1
              responseData.msg = '新增用户保存失败'
              res.json(responseData)
            }
          })
        } else {
          responseData.ok = 1
          responseData.msg = '该邮箱已注册'
          res.json(responseData)
        }
      })
    } else {
      responseData.ok = 1
      responseData.msg = '该手机号已注册'
      res.json(responseData)
    }
  })
})

router.get('/list', (req, res, next) => {
  let pageSize = parseInt(req.query.perPage) || 10

  let skipCount = 0

  if (req.query.page) {
    skipCount = parseInt((req.query.page - 1) * pageSize)
  }

  let action
  if (req.query.keyword && req.query.keyword.length) {
    action = Promise.all([
      User.findByOpts(req.query.keyword, pageSize, skipCount),
      User.findByOpts(req.query.keyword)
    ])
  } else {
    action = Promise.all([
      User.findAll(pageSize, skipCount),
      User.findAll()
    ])
  }

  action.then(rs => {
    responseData.msg = '搜索成功'

    let array = []
    let rows = rs[0]
    for(let i=0; i<rows.length; i++) {
      let obj = rows[i]
      array.push({
        id: obj['_id'],
        username: obj['username'],
        mobile: obj['mobile'],
        sex: obj['sex'],
        email: obj['email'],
        remark: obj['remark']
      })
    }

    responseData.data = {
      rows: array,
      totalCount: rs[1]
    }
    res.json(responseData)
  }).catch(error => {
    responseData.ok = 1
    responseData.msg = '搜索失败'
    responseData.error = error
    res.json(responseData)
  })
})

router.post('/detail', (req, res, next) => {
  console.log(req.body.id)
  User.findById(req.body.id).then(rs => {
    responseData.msg = '获取用户详情成功'
    responseData.data = rs
    responseData.data = {
      username: rs['username'],
      mobile: rs['mobile'],
      email: rs['email'],
      remark: rs['remark'],
      createdBy: rs['createdBy'],
      status: rs['status'],
      createdAt: (new Date(rs['createdAt'])).getTime(),
      updatedAt: (new Date(rs['updatedAt'])).getTime()
    }
    res.json(responseData)
  }).catch(error => {
    responseData.ok = 1
    responseData.msg = '获取用户详情失败'
    responseData.error = error
    res.json(responseData)
  })
})

router.post('/unusable', (req, res, next) => {
  User.findById(req.body.id).then(rs => {
    if (rs.status === 'normal') {
      User.updateById(req.body.id, {
        status: 'unusable'
      }).then(rs => {
        responseData.msg = '停用账号成功'
        res.json(responseData)
      }).catch(error => {
        responseData.ok = 1
        responseData.msg = '停用账号失败'
        responseData.error = error
        res.json(responseData)
      })
    } else {
      responseData.ok = 1
      responseData.msg = '该账号已经为停用状态'
      res.json(responseData)
    }
  }).catch(error => {
    responseData.ok = 1
    responseData.msg = '账号不存在'
    responseData.error = error
    res.json(responseData)
  })
})

router.post('/prohibite', (req, res, next) => {
  User.findById(req.body.id).then(rs => {
    if (rs.status !== 'prohibite') {
      User.updateById(req.body.id, {
        status: 'prohibite'
      }).then(rs => {
        responseData.msg = '禁用用户账号成功'
        res.json(responseData)
      }).catch(error => {
        responseData.ok = 1
        responseData.msg = '禁用用户账号失败'
        responseData.error = rs
        res.json(responseData)
      })
    } else {
      responseData.ok = 1
      responseData.msg = '该账号已经为禁用状态'
      res.json(responseData)
    }
  }).catch(error => {
    responseData.ok = 1
    responseData.msg = '账号不存在'
    responseData.error = rs
    res.json(responseData)
  })
})

router.post('/normal', (req, res, next) => {
  User.findById(req.body.id).then(rs => {
    if (rs.status !== 'normal') {
      User.updateById(req.body.id, {
        status: 'normal'
      }).then(rs => {
        responseData.msg = '用户账号恢复正常'
        res.json(responseData)
      }).catch(error => {
        responseData.ok = 1
        responseData.msg = '用户账号恢复失败'
        responseData.error = error
        res.json(responseData)
      })
    } else {
      responseData.ok = 1
      responseData.msg = '该账号已经为正常状态'
      res.json(responseData)
    }
  }).catch(error => {
    responseData.ok = 1
    responseData.msg = '账号不存在'
    responseData.error = error
    res.json(responseData)
  })
})

router.post('/resetPwd', (req, res, next) => {
  User.findById(req.body.id).then(rs => {
    User.updateById(req.body.id, {
      password: '123456'
    }).then(rs => {
      responseData.msg = '重置成功'
      res.json(responseData)
    }).catch(error => {
      responseData.ok = 1
      responseData.msg = '重置失败'
      responseData.error = error
      res.json(responseData)
    })
  }).catch(error => {
    responseData.ok = 1
    responseData.msg = '账号不存在'
    responseData.error = error
    res.json(responseData)
  })
})
module.exports = router;