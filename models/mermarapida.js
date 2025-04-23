'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MermaRapida extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MermaRapida.init({
    id_usuario: DataTypes.INTEGER,
    id_zona: DataTypes.INTEGER,
    id_semana: DataTypes.INTEGER,
    id_finca: DataTypes.INTEGER,
    numero_dedos: DataTypes.INTEGER,
    habilitado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'MermaRapida',
  });
  return MermaRapida;
};