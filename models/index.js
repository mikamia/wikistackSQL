var Sequelize = require('sequelize');

var db = new Sequelize('postgres://localhost:5432/wikistack');

var User = db.define('user', {
  name: Sequelize.STRING,
  email: Sequelize.STRING
  });
