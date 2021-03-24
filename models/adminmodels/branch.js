const {Sequelize} = require('sequelize');
const sequelize = require('../../util/database');

const Branch = sequelize.define('branch',{
    'Shop': Sequelize.STRING,
    'EBSCode': Sequelize.STRING,
    'Location': Sequelize.STRING,
    'Warehouse': Sequelize.STRING
});

module.exports = Branch;