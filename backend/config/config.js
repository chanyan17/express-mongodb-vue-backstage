/**
 * 配置文件
**/

const production = {}

const development = {
  TOKEN: {
    // 密钥
    SECRET_OR_PRIVATE_KEY: 'backend',
    // 1个小时
    EXPIRES_IN: 60*1*60
  },
  SERVER_PORT: 3000,
  MONGO: {
    host: 'localhost',
    user: '',
    password: '',
    port: '27017',
    database: 'backend'
  }
}

const config = development
module.exports = config