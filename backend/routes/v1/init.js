const express = require('express')
const router = express.Router()

// 获取基础数据
router.get('/data', (req, res, next) => {
  let responseData = {
    ok: 0,
    msg: '获取基础数据成功',
    data: {
      sexes: [
        {id: 'male', name: '男'},
        {id: 'female', name: '女'}
      ],
      authTypes: [
        // 本后台没有目录
        {
          id: 'catalog',
          name: '目录',
          isUsed: false
        },
        {
          id: 'menu',
          name: '菜单',
          isUsed: true
        },
        {
          id: 'button',
          name: '按钮',
          isUsed: true
        }
      ],
      displayModes: [
        {
          id: 'currentWindow',
          name: '当前窗口'
        },
        {
          id: 'newwindow',
          name: '新窗口/新标签'
        },
        {
          id: 'dialogWindow',
          name: '弹出窗口'
        },
        {
          id: 'browserWindow',
          name: '弹出浏览器窗口'
        }
      ]
    }
  }
  res.json(responseData)
})

module.exports = router;