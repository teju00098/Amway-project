const {Sequelize} = require('sequelize');
const sequelize = require('../util/database');

const Variancereport = sequelize.define('variancereport',{
  aWarehouse: Sequelize.STRING,
  aOracleItem: Sequelize.STRING,
  'Item Description': Sequelize.STRING,
  aSubInv: Sequelize.STRING,
  aLocation: Sequelize.STRING,
  aQty: Sequelize.STRING,
  bQty: Sequelize.STRING
});

module.exports = Variancereport;