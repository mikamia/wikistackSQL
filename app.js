'use strict';
var express = require('express');
var app = express();
var morgan = require('morgan');
var swig = require('swig');

// logging middleware
app.use(morgan('dev'));
