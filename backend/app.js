// 导入express模块
const express = require('express')

// 启动web服务器
const app = express()

app.use('/user', require('./src/route/user'))
app.use('/functions', require('./src/route/functions'))
app.use('/role', require('./src/route/role'))

//连接数据库，连接之前先安装并开启数据库服务器
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/authRole', err => {
    if (err) {
        console.log('mongoose connect fail')
    } else {
        console.log('mongoose connect success')
        const port = process.env.PORT || 3001
        //监听http请求
        app.listen(port)
        console.log('port open at http://localhost:' + port)
    }
})

app.get('/', (req, res) => res.send('Hello World!'))