'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Billings', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      userId: { type: Sequelize.INTEGER, allowNull: false },
      date: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      type: { type: Sequelize.ENUM('purchase', 'deposit'), allowNull: false },
      amount: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      description: { type: Sequelize.STRING },
      status: { type: Sequelize.STRING, defaultValue: '已完成' },
      reference: { type: Sequelize.STRING },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Billings');
  }
}; 