const {Sequelize} = require('sequelize');
const sequelize = require('../util/database');

const User = sequelize.define('user',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true,
    defaultvalue:Sequelize.UUIDV4,
  },
  username: {
    type: Sequelize.STRING,
    unique: true
  },
  password: Sequelize.STRING
});

module.exports = User;
