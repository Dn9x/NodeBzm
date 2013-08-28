var mysql  = require('../node_modules/mysql');
var config = require('../config');

//创建数据库连接池
var pool  = mysql.createPool(config);

module.exports = pool;