'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fruta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Fruta.init({
    id_comercializadora: DataTypes.INTEGER,
    tipo: DataTypes.STRING,
    peso_bruto: DataTypes.FLOAT,
    habilitado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Fruta',
  });
  return Fruta;
};