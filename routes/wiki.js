'use strict';
var express = require('express');
var router = express.Router();

router.get('/', function(){
  console.log("router");
});

module.exports = router;
