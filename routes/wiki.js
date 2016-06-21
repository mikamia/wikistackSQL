'use strict';
var express = require('express');
var router = express.Router();

var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function (req, res, next) {
  Page.findAll()
    .then(function(allPages){
      res.render('index', {allPages: allPages});
      console.log(allPages);
    });

  //res.redirect('/');
});

router.post('/', function (req, res, next) {
  var title = req.body.title;
  var content = req.body.content;

  var page = Page.build({
    title: title,
    content: content
  });

  page.save().then(function (page) {
    res.redirect(page.route);
  });
});

router.get('/add', function (req, res, next) {
  res.render('addpage');
});

router.get('/:urlTitle', function(req,res,next){

  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then(function(foundPage){
    res.render('wikipage', {
      page: foundPage
    });
  })
  .catch(next);
  //res.send('hit dynamic route at ' + req.params.urlTitle);
})

module.exports = router;
