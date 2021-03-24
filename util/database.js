const { Sequelize } = require('sequelize');
//const { Sequelize } = require('sequelize1');

const databasename = "database"; 

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'data/'+ databasename +'.sqlite'
});

module.exports = sequelize;