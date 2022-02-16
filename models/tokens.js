'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tokens.hasOne(models.User, {
        foreignKey: 'uuid',
        as: 'users',
        onDelete: 'cascade'
      })
    }
  }
  Tokens.init({
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    token: DataTypes.STRING,
    uuidUser: DataTypes.UUID,
    device: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tokens',
  });
  return Tokens;
};