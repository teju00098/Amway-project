const {Sequelize} = require('sequelize');
const sequelize = require('../util/database');

const BookCount = sequelize.define('bookcount',{
  aWarehouse: Sequelize.STRING,
  'Item Description': Sequelize.STRING,
  aOracleItem: Sequelize.STRING,
  aSubInv: Sequelize.STRING,
  Quantity: Sequelize.STRING
});

module.exports = BookCount;