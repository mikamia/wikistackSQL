var Sequelize = require('sequelize');

var db = new Sequelize('postgres://localhost:5432/wikistack');

var Page = db.define('page', {
  title: Sequelize.STRING,
  urlTitle: Sequelize.STRING,
  content: Sequelize.STRING,
  date: Sequelize.DATE,
  status: Sequelize.BOOLEAN
});
