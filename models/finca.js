'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Finca extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Comercializadora, {
        foreignKey: 'id',
        sourceKey: 'id_comercializadora',
        as: 'comercializadora'
      });

      this.hasOne(models.AgrupacionFinca, {
        foreignKey: 'id',
        sourceKey: 'id_agrupacion_fincas',
        as: 'agrupacion_fincas'
      });
      // define association here
    }
  }
  Finca.init({
    nombre: DataTypes.STRING,
    id_comercializadora: DataTypes.INTEGER,
    id_agrupacion_fincas: DataTypes.INTEGER,
    habilitado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Finca',
  });
  return Finca;
};