'use strict';
var express = require('express');
var app = express();
var morgan = require('morgan');
var swig = require('swig');
var bodyParser = require('body-parser');
var path = require('path');
var models = require('./models');

// logging middleware
app.use(morgan('dev'));
//Serves up static files from some kind of public folder.
app.use(express.static(path.join(__dirname, '/public')));
//Parses the request body.
// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests


//Incorporates swig into its rendering.
// point res.render to the proper directory
app.set('views', __dirname + '/views');
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files
// have it use swig to do so
app.engine('html', swig.renderFile);
// turn of swig's caching
swig.setDefaults({cache: false});

app.get('/', function (req, res){
  console.log('cool');
});

models.User.sync({})
.then(function () {
    return models.Page.sync({});
})
.then(function () {
  app.listen(3000, function () {
    console.log('listening to port 3000...');
  });
})
.catch(console.error);


