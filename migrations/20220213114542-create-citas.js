'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Citas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      veterinarios: {
        type: Sequelize.INTEGER
      },
      id_mascotas: {
        type: Sequelize.INTEGER
      },
      id_user: {
        type: Sequelize.INTEGER
      },
      fecha: {
        type: Sequelize.DATETIME
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Citas');
  }
};