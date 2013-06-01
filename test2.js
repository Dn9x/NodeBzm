var mysql      = require('./node_modules/mysql');
var pool  = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'biezuomeng',
});

pool.getConnection(function(err, connection) {

  // Use the connection
  connection.query( 'SELECT tag_name from bzm_tag where id=1', function(err, rows) {
	  if (err) throw err;

	  console.log('The solution is: ', rows[0].tag_name);
    // And done with the connection.
	//connection.end();		//¶Ï¿ªÁ¬½Ó·ÅÈëµ½Á¬½Ó³ØÖÐµÈ±ðÈËÊ¹ÓÃ
	connection.destroy();	//¹Ø±ÕÁ¬½ÓÏÂ´ÎÊ¹ÓÃÔÚÖØÐÂ½¨Á¢

    // Don't use the connection here, it has been returned to the pool.
  });
});

//得到连接
 // var connection = mysql.createConnection(config);

  //连接数据库
  //connection.connect();

  //connection.query('select a.article_title as title, a.article_content as content, a.article_date+\'\' as date, a.id as id, a.article_access as access, t.tag_Name as tag, d.admin_Name as name from bzm_article a, bzm_tag t, bzm_admin d where a.article_TagId=t.id and a.article_AdminId=d.id order by date desc limit ?, 10', [page], function(err, articles) {
    
//    if (err){
   //   callback(err, null);
 //   }
//
   // callback(null, articles);
//  });

 // connection.end();