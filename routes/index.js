
var Article = require('../models/article.js');
var Tag = require('../models/tag.js');
var Log = require('../models/log.js');

module.exports = function(app){
  app.get('/',function(req,res){
  	//获取文章列表信息
    Article.getTen(0, function(err, articles){

    	//判断是否有错
    	if(err){
    		//如果有错就给文章空值
    		articles = [];
    	}

      Log.error('这里是日志：首页文章列表');

    	//返回结果
  		res.render('index', {
  			title: '做梦也很累',   //页面titile
  			articles: articles	   //文章列表
  		});
  	});
  });

  //获取文章详情
  app.get('/detail/:id',function(req,res){
    //获取文章列表信息
    Article.getOne(req.params.id, function(err, article){

      //判断是否有错
      if(err){
        //如果有错就给文章空值
        article = [];
      }

      Log.log('这里是日志：文章详情');

      //返回结果
      res.render('detail', {
        title: article.title,   //页面titile
        article: article     //文章内容
      });
    });
  });

  //获取tag列表
  app.get('/tag',function(req,res){
    //获取tag列表信息
    Tag.getList(function(err, tags){

      //判断是否有错
      if(err){
        //如果有错就给tag空值
        tags = [];
      }

      Log.trace('这里是日志：Tag列表');

      //返回结果
      res.render('tag', {
        title: 'Tag',   //页面titile
        tags: tags,       //tag
        key: [],
        articles: []       //tag
      });
    });
  });

  //获取tag列表通过key
  app.get('/tag/:key',function(req,res){
    var key;

    //过滤C#关键字
    if(req.params.key == 'C'){
      key = 'C#';
    }else{
      key = req.params.key;
    }

    //获取tag列表信息
    Tag.getLiByKey(key, 0, function(err, articles){

      //判断是否有错
      if(err){
        //如果有错就给tag空值
        articles = [];
      }

      //获取tag列表信息
      Tag.getList(function(err, tags){

        //判断是否有错
        if(err){
          //如果有错就给tag空值
          tags = [];
        }

        //返回结果
        res.render('tag', {
          title: key,   //页面titile
          tags: tags,
          key: key,
          articles: articles       //tag
        });
      });
    });
  });





};