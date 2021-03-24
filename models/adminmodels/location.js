const {Sequelize} = require('sequelize');
const sequelize = require('../../util/database');

const Location = sequelize.define('location',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true,
    defaultvalue:Sequelize.UUIDV4,
  },
  subinventory: Sequelize.STRING,
  location: Sequelize.STRING,
  Flag:{
    type: Sequelize.STRING,
    defaultValue: "Y"
  }
});

module.exports = Location;