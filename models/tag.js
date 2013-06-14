var db = require('./db');

function Tag(name, code){
	this.name = name;
	this.code = code;
};

module.exports = Tag;

/**
 * 查询Tag列表的方法
 * Callback:
 * - err, 数据库错误
 * @param {Function} callback 回调函数
 */
Tag.getList = function(callback){

	//从连接池中获取一个连接
	db.getConnection(function(err, connection) {

	  //查询
	  connection.query('select t.id as id, t.tag_Name as name, count(1) as count from bzm_article a, bzm_tag t where a.article_TagId=t.id group by article_TagId', function(err, tags) {
		if (err){
		  callback(err, null);
		}

		callback(null, tags);

		connection.end();		//使用完之后断开连接，放回连接池
		//connection.destroy();	//使用之后释放资源，下次使用重新连接
	  });
	});
};

/**
 * 查询Tag列表通过关键字的方法
 * Callback:
 * - err, 数据库错误
 * @param {string} key 查询的关键字
 * @param {int} page   分页的其实索引
 * @param {Function} callback 回调函数
 */
Tag.getLiByKey = function(key, page, callback){

	//从连接池中获取一个连接
	db.getConnection(function(err, connection) {
      var sql = 'select a.article_title as title, a.article_content as content, a.article_date as date, a.id as id, a.article_access as access, t.tag_Name as tag, d.admin_Name as name from bzm_article a, bzm_tag t, bzm_admin d where a.article_TagId=t.id and a.article_AdminId=d.id and t.tag_Name='+connection.escape(key)+' order by date desc limit '+connection.escape(page)+', 5'

	  //查询
	  connection.query(sql, function(err, articles) {
		if (err){
		  callback(err, null);
		}

		callback(null, articles);

		connection.end();		//使用完之后断开连接，放回连接池
		//connection.destroy();	//使用之后释放资源，下次使用重新连接
	  });
	});
};

