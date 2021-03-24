const { Sequelize } = require('sequelize');
//const { Sequelize } = require('sequelize1');

//dynamic database setting..
const databasename = "database_"+warehousenumber; 

const sequelize_W = new Sequelize({
  dialect: 'sqlite',
  storage: 'data/'+ databasename +'.sqlite'
});

module.exports = sequelize_W;