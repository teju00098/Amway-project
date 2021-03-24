const {Sequelize} = require('sequelize');
const sequelize = require('../../util/database');

const Uom = sequelize.define('uom',{
  prtnum: Sequelize.STRING,
  lngdsc: Sequelize.STRING,
  uomcod: Sequelize.STRING,
  untqty: Sequelize.STRING,
  Barcode: Sequelize.STRING
});

module.exports = Uom;