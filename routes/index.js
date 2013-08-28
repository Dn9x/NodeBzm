
var Article = require('../models/article.js');
var Tag = require('../models/tag.js');
var Comment = require('../models/comment.js');
var config = require('../config');
var data2xml = require('../node_modules/data2xml');
var Log = require('../models/log.js');

module.exports = function(app){
  app.get('/',function(req,res){
  	//获取文章列表信息
    Article.getTen(0, 10, function(err, articles){

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

  //首页文章下一页
  app.post('/nextp',function(req, res){

    console.log(req.body.id);

    //获取文章列表信息
    Article.getTen(parseInt(req.body.id), 1, function(err, articles){

      //判断是否有错
      if(err){

      console.log(err);
        //如果有错就给文章空值
        articles = [];
      }

      Log.log('json' + articles);

      //返回结果
      res.json(articles);
    });
  });

  //tag文章下一页
  app.post('/nextt', function(req, res){
    var key;

    //过滤C#关键字
    if(req.body.key == 'C'){
      key = 'C#';
    }else{
      key = req.body.key;
    }

    //获取tag列表信息
    Tag.getLiByKey(key, parseInt(req.body.id), function(err, articles){

      //判断是否有错
      if(err){
        //如果有错就给tag空值
        articles = [];
      }


      Log.log('articles json:  ' + articles);

      //返回结果
      res.json(articles);
    });
  });

  //评论下一页
  app.post('/nextc', function(req, res){
    //查询评论列表
    Comment.getTwes(parseInt(req.body.title), parseInt(req.body.ind), function(err, comments){
      if(err){
        comments: [];
      }

      Log.log('nextc : %s,  %s ', req.body.title, req.body.ind);

      //返回结果
      res.json(comments);
    });
  });

  //验证ID必须为数字
  app.param('id', function(req, res, next){
    if(!isNaN(req.params.id)){
      Article.addAcce(req.params.id, function(err, reslut){});

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
        //如果有错就给文章空值
        article = [];
      }

      //查询评论列表
      Comment.getTwes(req.params.id, 0, function(err, comments){
        if(err){
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

    //判断是否有为空的数据
    if(req.body.aid.length > 0 && req.body.name.length > 0 && req.body.content.length > 0){
      //保存数据
      var comment = new Comment(req.body.aid, req.body.name, req.body.content);

      //添加
      comment.addOne(comment, function(err, result){
        if(err){
          set404('404', req, res);
        }

        res.redirect('/detail/' + req.body.aid);
      });
    }
  });

  //获取rss
  app.get('/feed',function(req, res){
    //获取文章列表信息
    Article.getTen(0, config.rss.max_rss_items, function(err, articles){

      //判断是否有错
      if(err){
        //如果有错就给文章空值
        articles = [];
      }

      //rss对象
      var rss_obj = {
        _attr: { version: '2.0' },
        channel: {
          title: config.rss.title,
          link: config.rss.link,
          language: config.rss.language,
          description: config.rss.description,
          item: []
        },
      };

      articles.forEach(function (article) {
        rss_obj.channel.item.push({
          title: article.title,
          link: config.rss.link + '/detail/' + article.id,
          guid: config.rss.link + '/topic/' + article.id,
          description: article.content,
          author: article.name,
          pubDate: article.date
        });
      });

      var rss_content = data2xml('rss', rss_obj);

      res.contentType('application/xml');
      res.send(rss_content);
      
    });
  });

  //about
  app.get('/about',function(req,res){
    //返回结果
    res.render('about', {
      title: 'About Dn9x',   //页面titile
    });
  });

  //获取tag列表
  app.get('/time',function(req,res){
    //获取文章列表信息
    Article.getAll(function(err, articles){

      //判断是否有错
      if(err){
        //如果有错就给文章空值
        articles = [];
      }

      //返回结果
      res.render('time', {
        title: '时间轴',   //页面titile
        articles: articles     //文章列表
      });
    });
  });

  //获取tag列表
  app.get('/timeline',function(req,res){
    //获取文章列表信息
    Article.getAll(function(err, articles){

      //判断是否有错
      if(err){
        //如果有错就给文章空值
        articles = [];
      }

      var en = setJson(articles);

      //返回结果
      res.render('timeline', {
        title: '时间轴',   //页面titile
        en: en     //文章列表
      });
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

//拼接时光轴数据
function setJson(arts){
  var en = '[{id : 1, name : "别做梦创建", on : new Date(2011,2,2)}';

  arts.forEach(function(art, index){ 
    var d = art.date;

    var da = d.substr(0, 4) + ', ' + d.substr(5, 2) + ', ' + d.substr(8, 2);

    en += ',{' + 'id :' + (index+2) + ', name :"<a href=\'/detail/'+art.id+'\' target=\'_blank\'>' + art.title + '</a>"' + ', on :new Date(' + da + ')' + '}';
  })

  en += ']';

  return en;
}