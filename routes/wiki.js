'use strict';
var express = require('express');
var router = express.Router();

var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function (req, res, next) {
  Page.findAll()
    .then(function (allPages){
      res.render('index', {allPages: allPages});
    });
});

router.post('/', function (req, res, next) {
  var title = req.body.title;
  var content = req.body.content;
  var name = req.body.name;
  var email = req.body.email;
  var tags = req.body.tags.split(" ");

  User.findOrCreate({
    where: {
      name: name,
      email: email
    }
  })
  .then(function (vals) {
    var user = vals[0];

    var page = Page.build({
      title: title,
      content: content,
      tags: tags
    });

    return page.save().then(function (page) {
      return page.setAuthor(user);
    });

  })
  .then(function (page) {
    res.redirect(page.route);
    })
  .catch(next);
});

router.get('/add', function (req, res, next) {
  res.render('addpage');
});

router.get('/:urlTitle', function (req,res,next){

  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    },
    include: [
      {model: User, as: 'author'}
    ]
  })
  .then( function (foundPage){
    console.log(foundPage);
    if(foundPage === null){
      res.status(404).send();
    } else {
      //console.log("TAGS",foundPage.tags);
      //var tags = foundPage.tags.join(" ");
      res.render('wikipage', {
        page: foundPage,
        //tags: tags
      });
    }
  }).catch(next);

});

module.exports = router;
