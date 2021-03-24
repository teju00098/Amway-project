const {Sequelize} = require('sequelize');
const sequelize = require('../util/database');

const ShopCountVariance = sequelize.define('shopcountvariance',{
  OracleItem: Sequelize.STRING,
  ItemDescription: Sequelize.STRING,
  Warehouse: Sequelize.STRING,
  SubInv: Sequelize.STRING,
  BookQty: Sequelize.STRING,
  Quantity: Sequelize.STRING
});

module.exports = ShopCountVariance;