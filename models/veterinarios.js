'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Veterinarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Veterinarios.init({
    name: DataTypes.STRING,
    apellidos: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Veterinarios',
  });
  return Veterinarios;
};