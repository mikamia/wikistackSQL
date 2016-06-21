'use strict';
var express = require('express');
var router = express.Router();

var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function (req, res, next) {
  res.redirect('/');
});

router.post('/', function (req, res, next) {
  var title = req.body.title;
  var content = req.body.content;

  var page = Page.build({
    title: title,
    content: content
  });
  page.save().then(function (page) {
    res.json(page);
  });
});

router.get('/add', function (req, res, next) {
  res.render('addpage');
});

module.exports = router;
