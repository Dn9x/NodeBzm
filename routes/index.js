
 var Article = require('../models/article.js');

 module.exports = function(app){
  app.get('/',function(req,res){
  	//获取文章列表信息
    Article.getTen(0, function(err, articles){

    	//判断是否有错
    	if(err){
    		//如果有错就给文章空值
    		articles = [];
    	}

    	//返回结果
		res.render('index', {
			title: '做梦也很累',   //页面titile
			articles: articles	   //文章列表
		});
	});
  });
};