var db = require('./db');

function Comment(aid, name, content){
	this.aid = aid;
	this.name = name;
	this.content = content;
};

module.exports = Comment;

/**
 * 查询评论列表的方法 一次15条
 * Callback:
 * - err, 数据库错误
 * @param {int} aid 文章的ID
 * @param {int} page 分页的其实索引
 * @param {Function} callback 回调函数
 */
Comment.getTwes = function(aid, page, callback){

	//从连接池中获取一个连接
	db.getConnection(function(err, connection) {

	  //查询
	  connection.query('select comm_user as name, comm_content as content, date_format(comm_date+\'\', \'%Y-%m-%d %H:%m:%S\') as date, comm_articleid as aid from bzm_comment where comm_articleid=? order by comm_date desc limit ?, 15', [aid, page], function(err, comments) {
		if (err){
		  console.log('111: %s', err);
		  callback(err, null);
		}

		callback(null, comments);

		connection.end();		//使用完之后断开连接，放回连接池
		//connection.destroy();	//使用之后释放资源，下次使用重新连接
	  });
	});
};

/**
 * 添加评论
 * Callback:
 * - err, 数据库错误
 * @param {Comment} comm Comment对象
 * @param {Function} callback 回调函数
 */
Comment.prototype.addOne = function(comm, callback){

	//从连接池中获取一个连接
	db.getConnection(function(err, connection) {
	  var sql = 'insert into bzm_comment(comm_user, comm_content, comm_date, comm_articleId, remark) value('+connection.escape(comm.name)+', '+connection.escape(comm.content)+', sysdate(), '+connection.escape(comm.aid)+', null)';
	  
	  //插入数据
	  connection.query(sql, function(err, result) {

		if (err){
		  callback(err, null);
		}

		callback(null, result);

		connection.end();		//使用完之后断开连接，放回连接池
		//connection.destroy();	//使用之后释放资源，下次使用重新连接
	  });

	});
};