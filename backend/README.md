# backend

  ## MongoDB
    ### 下载与安装
    * 官网下载没反应，可通过[百度网盘下载](https://pan.baidu.com/s/13MtML0FrMGNvroodJ5Scgg)，提取码：`r02f`
    * [安装教程](https://blog.csdn.net/heshushun/article/details/77776706)

    ### 要点
    * 查看MongoDB服务：`计算机` - `管理` - `服务与应用程序` - `服务`
    * 使用管理员身份启动cmd来配置windows服务，完成后可通过`net start MongoDB`来启动MongoDB服务
    * 关闭MongoDB服务： `net stop MongoDB`
    * 可通过访问`http://localhost:27017 `来检查MongoDB是否启动，`27017`是mongodb的端口号

    > It looks like you are trying to access MongoDB over HTTP on the native driver port. -- 出现这句话则MongoDB已启动
  ## Robomongo： MongoDB可视化工具
    ### 下载与安装
    * [云盘传送门](https://pan.baidu.com/s/1lcXx2NbPyfazUAzFUhaSwQ) 提取码：`4ndb`
    * [安装教程](https://blog.csdn.net/u011684839/article/details/80911732)

    ## express
    ### [官网](http://www.expressjs.com.cn/)
    ### 安装
    * 进入项目根目录，创建package.json 文件

      ```bash
      npm init
      ```

    * 安装express
      ```bash
      npm install express --save
      ```
  ## 创建项目
    * 创建项目`backend`,并启动

      ```bash
      # use express-generator to create project
      express backend --view=pug

      # enter project
      cd backend

      # install dependencies
      npm install

      # Run the myapp on Windows
      DEBUG=backend:* npm start

      ```
  ## 安装依赖包
    * nodemon: 修改`package.json`的scripts"添加`"devstart": "nodemon ./bin/www"`, 执行`DEBUG=backend:* npm run devstart`运行
    * mongoose
    * generic-pool: [文档](https://github.com/coopernurse/node-pool)

    ```bash

    # auto restart express service after modified
    npm install --save-dev nodemon

    # database connection
    npm install mongodb --save

    # lib Tool
    npm install mongoose --save

    # connection pool
    npm install generic-pool --save

    # cors
    npm install cors --save

    # product token
    npm install jsonwebtoken --save

    ```
  ## 目录结构
    ```
    /backend
      /bin
        www
      /config               # 存放各种配置文件
        config.js
      /db                   # 存放各种数据库帮助类
        mongo-helper.js
      /node_moudles
      /public
        /images
        /javascripts
        /stylesheets
      /routes
        /users.js
      /schema               # 存放mongoose里的数据模式, 封装了基本的 crud 操作
        /user.js
      /views
        /error.pug
        /index.pug
        /layout.pug
      .gitignore
      app.js
      package.json
      README.md
    ```
  ## 配置文件
  ## 规划路由
  ## 数据库访问和业务逻辑处理
    ### 编写mongo-helper.js
    ### 编写数据访问方法
    ### 规范业务逻辑返回值
    ### 编写业务逻辑