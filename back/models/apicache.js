'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Apicache extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Apicache.init({
    date: DataTypes.STRING,
    response: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Apicache',
  });
  return Apicache;
};