'use strict';
var express = require('express');
var router = express.Router();

var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function (req, res, next) {
  User.findAll({})
  .then(function (users) {
    res.render('users', {users: users});
  });
});

router.get('/:id', function (req, res, next) {
  User.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(function (user) {
    Page.findAll({
      where: {
        authorId: user.id
      }
    })
    .then(function (pages) {
      res.render('user', {user: user, pages: pages});
    });
  });
});

module.exports = router;
