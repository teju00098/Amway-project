const {Sequelize} = require('sequelize');
const sequelize = require('../../util/database');

const Recode = sequelize.define('recode',{
  Seq: Sequelize.STRING,
  SKU: Sequelize.STRING,
  RecodeConfig: Sequelize.STRING
});

module.exports = Recode;