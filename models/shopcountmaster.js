const {Sequelize} = require('sequelize');
const sequelize = require('../util/database');

const ShopCountMaster = sequelize.define('shopcountmaster',{
  Item: Sequelize.STRING,
  OracleItem: Sequelize.STRING,
  ItemDescription: Sequelize.STRING,
  Warehouse: Sequelize.STRING,
  SubInv: Sequelize.STRING,
  MortgagedQty: Sequelize.INTEGER,
  BookQty: Sequelize.INTEGER,
  Flag:{
    type: Sequelize.STRING,
    defaultValue: "Y"
  }
});

module.exports = ShopCountMaster;