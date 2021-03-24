const {Sequelize} = require('sequelize');
const sequelize = require('../../util/database');

const Blackmarket = sequelize.define('blackmarket',{
    'Seq': Sequelize.STRING,
    'SKU': Sequelize.STRING,
    'RecodeConfig': Sequelize.STRING
});

module.exports = Blackmarket;