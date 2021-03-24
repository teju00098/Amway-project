const {Sequelize} = require('sequelize');
const sequelize = require('../../util/database');

const Teamb = sequelize.define('teamb',{
  Warehouse: Sequelize.STRING,
  OracleItem: Sequelize.STRING,
  SubInv: Sequelize.STRING,
  Location: Sequelize.STRING,
  Qty: Sequelize.STRING,
  Team: Sequelize.STRING,
  User: Sequelize.STRING,
  UpdatedateTime: Sequelize.STRING
});

module.exports = Teamb;