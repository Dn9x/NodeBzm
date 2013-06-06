var db = require('./db');

function Comment(aid, name, content){
	this.aid = aid;
	this.name = name;
	this.content = content;
};

module.exports = Comment;

//查询评论列表的方法 一次20条
Comment.getTwen = function(aid, page, callback){

	//从连接池中获取一个连接
	db.getConnection(function(err, connection) {

	  //查询
	  connection.query('select comm_user as name, comm_content as content, comm_date as date, comm_articleid as aid from bzm_comment where comm_articleid=? order by comm_date desc limit ?, 10', [aid], [page], function(err, comments) {
		if (err){
		  console.log('111:' + err);
		  callback(err, null);
		}

		  console.log('222:' + comments);
		callback(null, comments);

		connection.end();		//使用完之后断开连接，放回连接池
		//connection.destroy();	//使用之后释放资源，下次使用重新连接
	  });
	});
};

//添加评论
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