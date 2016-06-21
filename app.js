'use strict';
var express = require('express');
var app = express();
var morgan = require('morgan');
var swig = require('swig');
var bodyParser = require('body-parser');

// logging middleware
app.use(morgan('dev'));
//Serves up static files from some kind of public folder.
app.use(express.static(path.join(__dirname, '/public')));
//Parses the request body.
// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests
