const express = require('express')
const router = express.Router()

const Auth = require('../../schema/Auth')
const RoleAuth = require('../../schema/RoleAuth')

let responseData

// 设置接口输出前统一重置的统一返回字段
router.use((req, res, next) => {
    responseData = {
        ok: 0,
        msg: ''
    }
    next()
})

// 获取顶层父级权限
router.get('/parentAuth', (req, res, next) => {
  Auth.findParentAuth().then(rs => {
    let array = []

    for(let i=0; i<rs.length; i++) {
      let obj = rs[i]
      array.push({
        id: obj['_id'],
        name: obj['name']
      })
    }
    responseData.msg = '获取父层权限成功'
    responseData.data = array
    res.json(responseData)
  }).catch(error => {
    responseData.ok = 1
    responseData.msg = '获取父层权限失败'
    responseData.error = error
    res.json(responseData)
  })
})

// 新建权限
router.post('/create', (req, res, next) => {
  if (!req.body.name.length) {
    responseData.ok = 1
    responseData.msg = '缺少权限名称'
    res.json(responseData)
  }
  Auth.findByNameAndParentId(req.body.name, req.body.parentId).then(rs => {
    if (!rs.length) {
      Auth.save({
        name: req.body.name,
        parentId: req.body.parentId,
        authType: req.body.authType,
        location: req.body.location,
        authSign: req.body.authSign,
        displayMode: req.body.displayMode,
        isDisplay: req.body.isDisplay,
        remark: req.body.remark
      }).then(rs => {
        responseData.msg = '新增权限成功'
        res.json(responseData)
      }).catch(error => {
        responseData.ok = 1
        responseData.msg = '新增权限失败'
        responseData.error = error
        res.json(responseData)
      })
    } else {
      responseData.ok = 1
      responseData.msg = '该权限已存在'
      res.json(responseData)
    }
  })
})

// 模糊查询权限名称
router.get('/list', (req, res, next) => {
  let pageSize = parseInt(req.query.perPage) || 10

  let skipCount = 0
  if (req.query.page) {
    skipCount = parseInt((req.query.page - 1) * pageSize)
  }

  let action
  if (req.query.keyword && req.query.keyword.length) {
    action = Promise.all([
      Auth.findByName(req.query.keyword, pageSize, skipCount),
      Auth.findByName(req.query.keyword)
    ])
  } else {
    action = Promise.all([
      Auth.search(pageSize, skipCount).limit(pageSize).skip(skipCount),
      Auth.search()
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
        name: obj['name'],
        authType: obj['authType'],
        location: obj['location'],
        authSign: obj['authSign'],
        isDisplay: obj['isDisplay'],
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

// 查询全部
router.get('/all', (req, res, next) => {
  Auth.findAll().then(rs => {
    responseData.msg = '搜索成功'
    let array = []
    for(let i=0; i<rs.length; i++) {
      let obj = rs[i]
      array.push({
        id: obj['_id'],
        name: obj['name'],
        parentId: obj['parentId'],
        authType: obj['authType'],
        location: obj['location'],
        authSign: obj['authSign'],
        isDisplay: obj['isDisplay'],
        remark: obj['remark']
      })
    }
    responseData.data = array
    res.json(responseData)
  }).catch(error => {
    responseData.ok = 1
    responseData.msg = '搜索失败'
    responseData.error = error
    res.json(responseData)
  })
})

// 查看详情
router.post('/detail', (req, res, next) => {
  Auth.findById(req.body.id).then(rs => {
    responseData.msg = '获取权限详情成功'
    responseData.data = {
      parentId: rs['parentId'],
      name: rs['name'],
      authType: rs['authType'],
      location: rs['location'],
      authSign: rs['authSign'],
      displayMode: rs['displayMode'],
      isDisplay: rs['isDisplay'],
      remark: rs['remark'],
      createdAt: (new Date(rs['createdAt'])).getTime(),
      updatedAt: (new Date(rs['updatedAt'])).getTime()
    }
    res.json(responseData)
  }).catch(error => {
    responseData.ok = 1
    responseData.msg = '获取权限详情失败'
    responseData.error = error
    res.json(responseData)
  })
})

// 更新权限
router.post('/update', (req, res, next) => {
  if (!req.body.id) {
    responseData.ok = 1
    responseData.msg = '缺少参数id'
    res.json(responseData)
  }
  var condition = {
      name: req.body.name,
      parentId: req.body.parentId,
      authType: req.body.authType,
      location: req.body.location,
      authSign: req.body.authSign,
      displayMode: req.body.displayMode,
      isDisplay: req.body.isDisplay,
      remark: req.body.remark
    },
    _condition = {}

  for(let i in condition) {
    if (condition[i]) {
      _condition[i] = condition[i]
    }
  }
  console.log(_condition)

  Auth.updateById(
    req.body.id,
    _condition
  ).then(rs => {
    Auth.findById(req.body.id).then(rs => {
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

// 删除权限
router.post('/delete', (req, res, next) => {
  if (!req.body.id) {
    responseData.ok = 1
    responseData.msg = '缺少权限id'
    res.json(responseData)
  }
  Auth.findById(req.body.id).then(rs => {
    if (!rs) {
      responseData.ok = 1
      responseData.msg = '该权限id不存在'
      res.json(responseData)
    } else {
      RoleAuth.removeByAuthId(req.body.id).then(rs => {
        Auth.removeById(req.body.id).then(rs => {
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