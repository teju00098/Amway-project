const {Sequelize} = require('sequelize');
const sequelize = require('../util/database');

const ShopBookCount = sequelize.define('shopbookcount',{
  OracleItem: Sequelize.STRING,
  ItemDescription: Sequelize.STRING,
  Warehouse: Sequelize.STRING,
  SubInv: Sequelize.STRING,
  BookQty: Sequelize.STRING
});

module.exports = ShopBookCount;