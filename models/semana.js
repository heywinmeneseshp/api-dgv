'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Semana extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Semana.init({
    semana: DataTypes.STRING,
    anio: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Semana',
  });
  return Semana;
};