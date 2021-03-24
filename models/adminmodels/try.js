const {Sequelize} = require('sequelize');
const sequelize = require('../../util/database');

const Cost = sequelize.define('cost',{
  Trim: Sequelize.STRING,
  WH: Sequelize.STRING,
  LOCATION: Sequelize.STRING,
  ITEM: Sequelize.STRING,
  DESC: Sequelize.STRING,
  PRICE: Sequelize.STRING,
  CLASS: Sequelize.STRING
});

module.exports = Cost;