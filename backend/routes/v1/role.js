const express = require('express')
const router = express.Router()

const Role = require('../../schema/Role')
const RoleAuth = require('../../schema/RoleAuth')

var responseData

// 设置接口输出前统一重置的统一返回字段
router.use((req, res, next) => {
    responseData = {
        ok: 0,
        msg: ''
    }
    next()
})

// 新建角色
router.post('/create', (req, res, next) => {
  Role.findByKeyword(req.body.key).then(rs => {
    console.log(rs)
    if (!rs) {
      Role.save({
        key: req.body.key,
        name: req.body.name,
        desc: req.body.desc,
        createdBy: req.body.createdBy
      }).then(rs => {
        responseData.msg = '新增角色成功'
        res.json(responseData)
      }).catch(error => {
        responseData.ok = 1
        responseData.msg = '新增角色失败'
        res.json(responseData)
      })
    } else {
      responseData.ok = 1
      responseData.msg = '角色标识已存在'
      res.json(responseData)
    }
  })
})

// 配置权限
router.post('/configAuth', (req, res, next) => {
  RoleAuth.removeByRoleId(req.body.id).then(rs => {
    RoleAuth.insert(req.body.id, req.body.authIds).then(rs => {
      responseData.msg = '配置权限成功'
      responseData.data = rs
      res.json(responseData)
    }).catch(error => {
      if (error === '角色权限关系未选择') {
        responseData.ok = 1
        responseData.msg = '角色没有选择对应的权限，配置失败'
        res.json(responseData)
      } else {
        responseData.ok = 1
        responseData.msg = '权限配置失败'
        responseData.error = error
        res.json(responseData)
      }
    })
  })
})

// 获取角色列表
router.get('/list', (req, res, next) => {
  let pageSize = parseInt(req.query.perPage) || 10

  let skipCount = 0
  if (req.query.page) {
    skipCount = parseInt((req.query.page - 1) * pageSize)
  }

  let action
  if (req.query.keyword && req.query.keyword.length) {
    action = Promise.all([
      Role.findByKeyword(req.query.keyword, pageSize, skipCount),
      Role.findByKeyword(req.query.keyword)
    ])
  } else {
    action = Promise.all([
      Role.findAll(pageSize, skipCount),
      Role.findAll()
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
        key: obj['key'],
        name: obj['name'],
        desc: obj['desc'],
        createdBy: obj['createdBy'],
        createdAt: (new Date(obj['createdAt'])).getTime(),
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

// 获取角色权限
router.get('/roleAuth', (req, res, next) => {
  if (req.query.roleId) {
    RoleAuth.findById(req.query.roleId).then(rs => {
      responseData.ok = 0
      responseData.msg = '获取成功'
      let array = []
      for(let i=0; i<rs.length; i++) {
        let obj = rs[i]
        array.push({
          id: obj['_id'],
          authId: obj['authId'],
          roleId: obj['roleId'],
          createdAt: (new Date(obj['createdAt'])).getTime(),
          updatedAt: (new Date(obj['updatedAt'])).getTime()
        })
      }
      responseData.data = array
      res.json(responseData)
    }).catch(error => {
      responseData.ok = 1
      responseData.msg = '获取失败'
      responseData.error = error
      res.json(responseData)
    })
  } else {
    responseData.ok = 1
    responseData.msg = '缺少角色id'
    res.json(responseData)
  }
})

// 获取详情
router.post('/detail', (req, res, next) => {
  Role.findById(req.body.id).then(rs => {
    responseData.msg = '获取角色详情成功'
    responseData.data = rs
    responseData.data = {
      key: rs['key'],
      name: rs['name'],
      desc: rs['desc'],
      createdBy: rs['createdBy'],
      createdAt: (new Date(rs['createdAt'])).getTime(),
      updatedAt: (new Date(rs['updatedAt'])).getTime()
    }
    res.json(responseData)
  }).catch(error => {
    responseData.ok = 1
    responseData.msg = '获取角色详情失败'
    responseData.error = error
    res.json(responseData)
  })
})

// 保存编辑
router.post('/update', (req, res, next) => {
  if (!req.body.id) {
    responseData.ok = 1
    responseData.msg = '缺少参数id'
    res.json(responseData)
  }
  var condition = {
      key: req.body.key,
      name: req.body.name,
      desc: req.body.desc,
      createdBy: req.body.createdBy
    },
    _condition = {}

  for(let i in condition) {
    if (condition[i]) {
      _condition[i] = condition[i]
    }
  }

  Role.updateById(
    req.body.id,
    _condition
  ).then(rs => {
    Role.findById(req.body.id).then(rs => {
    console.log(rs)
    responseData.msg = '编辑保存成功'
    res.json(responseData)
  })
  }).catch(error => {
    responseData.ok = 1
    responseData.msg = '编辑保存失败'
    responseData.error = error
    res.json(responseData)
  })
})

// 删除角色
router.post('/delete', (req, res, next) => {
  if (!req.body.id) {
    responseData.ok = 1
    responseData.msg = '缺少角色id'
    res.json(responseData)
  }
  Role.findById(req.body.id).then(rs => {
    if (!rs) {
      responseData.ok = 1
      responseData.msg = '该角色id不存在'
      res.json(responseData)
    } else {
      RoleAuth.removeByRoleId(req.body.id).then(rs => {
        Role.removeById(req.body.id).then(rs => {
          responseData.msg = '删除成功'
          res.json(responseData)
        })
      }).catch(error => {
        responseData.ok = 1
        responseData.msg = '删除失败'
        responseData.error = error
        res.json(responseData)
      })
    }
  })
})

module.exports = router;