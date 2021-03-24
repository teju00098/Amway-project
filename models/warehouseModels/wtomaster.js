const {Sequelize} = require('sequelize');
const sequelize_W = require('../util/database_wto');

var myModel = "wtoMaster_"+warehousenumber;

myModel = sequelize_W.define('wtomaster',{
  Item: Sequelize.STRING,
  'Oracle Item': Sequelize.STRING,
  'Item Description': Sequelize.STRING,
  Warehouse: Sequelize.STRING
});

module.exports = wtoMaster;