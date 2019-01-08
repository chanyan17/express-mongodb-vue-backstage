const express = require('express')
const router = express.Router()

const Role = require('../../schema/Role')

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
  Role.save({
    id: req.body.id,
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
})

// 获取角色列表
// router.get('/list', (req, res, next) => {
//   if (!req.query.keyword ) {
//     Role.findAll().then(rs => {
//       responseData.msg = '新增角色成功'
//       res.json(responseData)
//     }).catch(error => {
//       responseData.ok = 1
//       responseData.msg = '新增角色失败'
//       res.json(responseData)
//     })
//   }
// })

module.exports = router;