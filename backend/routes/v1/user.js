const express = require('express')
const router = express.Router()

const User = require('../../schema/User')

var responseData

// 设置接口输出前统一重置的统一返回字段
router.use((req, res, next) => {
    responseData = {
        ok: 0,
        msg: ''
    }
    next()
})

router.post('/addUser', (req, res, next) => {
  User.save({
    username: req.body.username,
    mobile: req.body.account,
    password: req.body.password
  }).then(rs => {
    responseData.msg = '新增用户保存成功'
    res.json(responseData)
  }).catch(error => {
    responseData.ok = 1
    responseData.msg = '新增用户保存失败'
    res.json(responseData)
  })
})

module.exports = router;