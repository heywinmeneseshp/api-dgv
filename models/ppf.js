'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ppf extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ppf.init({
    id_usuario: DataTypes.INTEGER,
    fecha: DataTypes.DATE,
    id_zona: DataTypes.INTEGER,
    valor: DataTypes.FLOAT,
    habilitado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Ppf',
  });
  return Ppf;
};