const mongooseConfig = require('../config/config.js')
const mongoose = require('mongoose')

/**
 * debug 模式
**/
// mongoose.set('debug', true);

/**
 * 配置 MongoDb options
 *
 * @returns {object}
**/
function getMongoOptions() {
  let options = {
    useNewUrlParser: true,
    autoIndex: false,
    poolSize: 5,
    reconnectTries: Number.MAX_VALUE,
    keepAlive: 120
  }
  if (mongooseConfig.MONGO.user) options.user = mongooseConfig.MONGO.user
  if (mongooseConfig.MONGO.password) options.password = mongooseConfig.MONGO.password
  return options
}

/**
 * 拼接 MongoDb Uri
 *
 * @returns {string}
**/
function getMongoUri() {
  let mongoUri = 'mongodb://'
  let host = mongooseConfig.MONGO.host
  let port = mongooseConfig.MONGO.port
  let database = mongooseConfig.MONGO.database

  mongoUri += host + ':' + port + '/' + database
  return mongoUri
}


/**
 * 创建 Mongo 连接，内部维护了一个连接池，全局共享
**/
// let mongoClient = mongoose.creatConnection(getMongoUri(), getMongoOptions())
mongoose.connect(getMongoUri(), getMongoOptions())
let mongoClient = mongoose.connection

/**
 * Mongo 连接成功回调
**/
mongoClient.on('connected', function () {
  console.log('Mongoose connected to ' + getMongoUri());
})
/**
 * Mongo 连接失败回调
**/
mongoClient.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
})
/**
 * Mongo 连接关闭回调
**/
mongoClient.on('disconnected', function () {
  console.log('Mongoose disconnected');
})
/**
 * Mongo 连接关闭
**/
function close() {
  mongoClient.close()
}

module.exports = {
  mongoClient: mongoClient,
  close: close
}