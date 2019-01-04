const express = require('express')

const router = express.Router()

const Functions = require('../entity/Functions')

const RoleFunction = require('../entity/RoleFunction')

var responseData

router.use((req, res, next) => {
    responseData = {
        ok: 0,
        msg: {}
    }
})

// 获取全部的权限（不分页）
router.get('/getAuthorizes', (req, res, next) => {
    Functions.findAll().then(funs => {
        responseData.data = funs
        responseData.msg = '查询权限数据列表成功'
        res.json(responseData)
    })
})


// 通过权限 _id 获取某个权限的详细信息
router.get('/getSubAuthorize', (req, res, next) => {
    Functions.findOneById(req.query.aid).then(fs => {
        responseData.data = fs
        res.json(responseData)
    })
})

// 新增 新的权限
router.post('/addAuthorizes', (req, res, next) => {
    Functions.save(req.body).then(fun => {
        responseData.msg = '新增权限成功'
        res.json(responseData)
    })
})

// 更新 通过 _id 修改权限
router.put('/updateAuthorizes', (req, res, next) => {
    Functions.updateById(req.body._id, {
        name: req.body.name,
        parentId: req.body.parentId,
        location: req.body.location
    }).then(fs => {
        responseData.msg = '修改权限成功'
        res.json(responseData)        
    }).catch(error => {
        responseData.ok = 1
        responseData.msg = '修改权限失败'
        res.json(responseData)
    })
})
// 删除 通过 _id 删除存在的权限
router.delete('/removeSubAuthorize', (req, res, next) => {
    RoleFunction.removeByFunId(req.query.aid).then(() => {
        return Functions.removeById(req.query.aid)
    }).then(() => {
        responseData.msg = '删除权限成功'
        res.json(responseData)
    }).catch(() => {
        responseData.ok = 1
        responseData.msg = '删除权限失败'
        res.json(responseData)
    })
})
//暴露权限路由接口
module.exports = router