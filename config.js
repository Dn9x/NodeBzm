module.exports = {
	host     : 'localhost',
	user     : 'root',
	password : '1234',
	database : 'biezuomeng',
	waitForConnections : true,	//如果连线超过了最大连线数就加入等待队列，false就返回一个错误
	connectionLimit : 40,		//连接的最大数40，默认是10
	queueLimit : 0,				//最大队列限制，如果超过最大连接数，就加入到队列，0表示队列无限制，默认0

	// RSS
    rss: {
      title: '别做梦-做梦也很累',
      link: 'http://121.199.33.218/bzm',
      language: 'zh-cn',
      description: '别做梦-做梦也很累',
      //最多获取的RSS Item数量
      max_rss_items: 15
  	},
};