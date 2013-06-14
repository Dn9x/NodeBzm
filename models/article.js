var db = require('./db');
var Log = require('./log.js');

function Article(title, content, date){
	this.title = title;
	this.content = content;
	this.date = date;
};

module.exports = Article;

/**
 * 查询文章列表的方法
 * Callback:
 * - err, 数据库错误
 * @param {int} page 分页的索引
 * @param {int} count 每页的文章个数
 * @param {Function} callback 回调函数
 */
Article.getTen = function(page, count, callback){

	//从连接池中获取一个连接
	db.getConnection(function(err, connection) {

	  var sql = 'select a.article_title as title, a.article_content as content, date_format(a.article_date+\'\', \'%Y-%m-%d %H:%m:%S\') as date, a.id as id, a.article_access as access, t.tag_Name as tag, d.admin_Name as name from bzm_article a, bzm_tag t, bzm_admin d where a.article_TagId=t.id and a.article_AdminId=d.id order by date desc limit '+connection.escape(page)+', '+connection.escape(count);

      Log.log('sql' + sql);

	  //查询
	  connection.query(sql, function(err, articles) {
		if (err){
		  
      		Log.log('err' + err);
		  callback(err, null);
		}

      		Log.log('articles' + articles);
		callback(null, articles);

		connection.end();		//使用完之后断开连接，放回连接池
		//connection.destroy();	//使用之后释放资源，下次使用重新连接
	  });
	});
};

/**
 * 查询文章详情的方法
 * Callback:
 * - err, 数据库错误
 * @param {int} id 文章的ID
 * @param {Function} callback 回调函数
 */
Article.getOne = function(id, callback){

	//从连接池中获取一个连接
	db.getConnection(function(err, connection) {
	  var sql = 'select a.article_title as title, a.article_content as content, date_format(a.article_date+\'\', \'%Y-%m-%d %H:%m:%S\') as date, a.id as id, a.article_access as access, t.tag_Name as tag, d.admin_Name as name from bzm_article a, bzm_tag t, bzm_admin d where a.article_TagId=t.id and a.article_AdminId=d.id and a.id=' + connection.escape(id);

	  //查询
	  connection.query(sql, function(err, article) {

		if (err){
		  callback(err, null);
		}

		callback(null, article[0]);

		connection.end();		//使用完之后断开连接，放回连接池
		//connection.destroy();	//使用之后释放资源，下次使用重新连接
	  });
	});
};