'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cards', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      userId: { type: Sequelize.INTEGER, allowNull: false },
      orderId: { type: Sequelize.INTEGER, allowNull: false },
      iccid: { type: Sequelize.STRING, allowNull: false, unique: true },
      purchasedAt: { type: Sequelize.DATE, allowNull: false },
      expiredAt: { type: Sequelize.DATE, allowNull: true },
      qrcode: { type: Sequelize.TEXT, allowNull: true },
      esimInfo: { type: Sequelize.JSON, allowNull: true }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Cards');
  }
}; 