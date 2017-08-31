let express = require('express');
let router = express.Router();
let Article = require('../model/schema.js')

router.get('/', function(req, res, next){
 Article.find(function(err,data){
  if(err){
  	console.log(err);
  	res.send(err);
  }
  	else {
  		console.log(data);
  		res.json({news:data});
  }
  })
});


router.post('/', function(req, res, next) {
  var title = req.body.title;
  var author = req.body.author;
  var article = req.body.article;
      Article.insertMany({
      "title":title,
      "author":author,
      "article":article
      },function(err,data){
        if(err){
          console.log(err);
        }
        else
        { console.log(data);
          res.json({news:data});
        }
    })
});

router.put('/',function(req,res,next){
  var id = req.body.id;
  var author = req.body.author;
  var article = req.body.article;
  Article.update({'_id':id},
    {$set:{ 'author': author,'article': article}},function(err,data){
      if(err)
      { console.log(err);
        res.send(err);
      }
      else
      { console.log(data);
        res.json({news:data});
      }

    })
});

router.delete('/',function(req,res,next){
  var title = req.body.title;
  Article.remove({'title':title},function(err,data){
      if(err)
      { console.log(err);
        res.send(err);
      }
      else
      { console.log(data.result);
        res.json({news:data});
      }
    })
});

module.exports = router;
