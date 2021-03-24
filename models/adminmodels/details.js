const {Sequelize} = require('sequelize');
const sequelize = require('../../util/database');

const Detail = sequelize.define('detail',{
    'CountID':{
        type: Sequelize.STRING,
      },
      'CountType':{
        type: Sequelize.STRING,
      },
      'CountSequence':{
        type: Sequelize.INTEGER,
      },
      'Warehouse':{
        type: Sequelize.STRING,
      },
      'DataDate':{
        type: Sequelize.INTEGER,
      }
});

module.exports = Detail;