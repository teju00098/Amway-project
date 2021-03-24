const {Sequelize} = require('sequelize');
const sequelize = require('../../util/database');

const Stock = sequelize.define('stock',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true,
    defaultvalue:Sequelize.UUIDV4,
  },
  stockcountname: Sequelize.STRING,
  counttype: Sequelize.STRING,
  description: Sequelize.TEXT
});

module.exports = Stock;