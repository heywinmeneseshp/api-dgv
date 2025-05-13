'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  usuario.init({
    usuario: DataTypes.STRING,
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    id_tipo: DataTypes.BIGINT,
    contrasenha: DataTypes.STRING,
    correo: DataTypes.STRING,
    telefono: DataTypes.STRING,
    direccion: DataTypes.STRING,
    habilitation: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return usuario;
};