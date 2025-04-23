'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CalibracionLargo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CalibracionLargo.init({
    id_usuario: DataTypes.INTEGER,
    id_semana: DataTypes.INTEGER,
    fecha: DataTypes.DATE,
    numero_racimos: DataTypes.INTEGER,
    cajita_l: DataTypes.FLOAT,
    lucha_baja_l: DataTypes.FLOAT,
    lucha_basal_l: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'CalibracionLargo',
  });
  return CalibracionLargo;
};