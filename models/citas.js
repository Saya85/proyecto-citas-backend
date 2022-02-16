'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Citas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Citas.hasOne(models.User, {
        foreignKey: 'uuid',
        as: 'users',
        onDelete: 'set null'
      })
      Citas.hasOne(models.Mascotas, {
        foreignKey: 'uuid',
        as: 'mascotas',
        onDelete: 'set null'
      })
      Citas.hasOne(models.Veterinario, {
        foreignKey: 'uuid',
        as: 'veterinario',
        onDelete: 'set null'
      })
    }
  }
  Citas.init({
      uuid: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    uuidUser: DataTypes.UUID,
    uuidMascota: DataTypes.UUID,
    uuidVeterinario: DataTypes.UUID,
    inital_date: DataTypes.DATE,
    final_date: DataTypes.DATE
    }, {
    sequelize,
    modelName: 'Citas',
  });
  return Citas;
};