
var Article = require('../models/article.js');
var Tag = require('../models/tag.js');
var Comment = require('../models/comment.js');
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

    	//返回结果
  		res.render('index', {
  			title: '做梦也很累',   //页面titile
  			articles: articles	   //文章列表
  		});
  	});
  });

  //验证ID必须为数字
  app.param('id', function(req, res, next){
    if(!isNaN(req.params.id)){
      next();
    }else{
      set404('404', req, res);
    }
  })

  //获取文章详情
  app.get('/detail/:id',function(req,res){
    //获取文章列表信息
    Article.getOne(req.params.id, function(err, article){

      //判断是否有错
      if(err){
        console.log(err);
        //如果有错就给文章空值
        article = [];
      }

      console.log('555: %s', Comment);

      //查询评论列表
      Comment.getTwen(req.params.id, 0, function(err, comments){
        if(err){

          console.log('222: %s', err);
          comments: [];
        }

        if(article == null){
          set404('404', req, res);
        }else{
          //返回结果
          res.render('detail', {
            title: article.title,   //页面titile
            article: article,     //文章内容
            comments: comments,
          });
        }
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

  //添加评论
  app.post('/comment', function(req, res){
    //保存数据
    var comment = new Comment(req.body.aid, req.body.name, req.body.content);

    //添加
    comment.addOne(comment, function(err, result){
      if(err){
        
        console.log('222:错误 %s', err);
      }
      
      console.log('333:插入成功 %s', result);

      res.redirect('/detail/' + req.body.aid);
    });
  });


  //处理404页面
  app.get('*', function(req, res) {
    set404('404', req, res);
  })

};

//处理404
function set404(msg, req, res){
  Log.error('404 %s %s', req.method, req.url);

  res.render('404', {
    status: 404,
    title: '404',
    msg: msg
  });
}