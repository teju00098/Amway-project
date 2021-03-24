const {Sequelize} = require('sequelize');
const sequelize = require('../util/database');

const Variance = sequelize.define('variance',{
  aWarehouse: Sequelize.STRING,
  aOracleItem: Sequelize.STRING,
  aSubInv: Sequelize.STRING,
  aLocation: Sequelize.STRING,
  aQty: Sequelize.STRING,
  bQty: Sequelize.STRING
});

module.exports = Variance;