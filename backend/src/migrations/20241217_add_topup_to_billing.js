'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 由於 SQLite 不支援直接修改 ENUM，我們需要重新創建表
    // 先備份現有數據
    const existingData = await queryInterface.sequelize.query(
      'SELECT * FROM Billings',
      { type: Sequelize.QueryTypes.SELECT }
    );

    // 刪除舊表
    await queryInterface.dropTable('Billings');

    // 重新創建表
    await queryInterface.createTable('Billings', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      customerId: { type: Sequelize.INTEGER, allowNull: false },
      date: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      type: { type: Sequelize.ENUM('purchase', 'deposit', 'topup'), allowNull: false },
      amount: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      description: { type: Sequelize.STRING, allowNull: true },
      status: { type: Sequelize.STRING, defaultValue: '已完成' },
      reference: { type: Sequelize.STRING, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW }
    });

    // 恢復數據
    if (existingData.length > 0) {
      await queryInterface.bulkInsert('Billings', existingData);
    }
  },

  down: async (queryInterface, Sequelize) => {
    // 備份數據
    const existingData = await queryInterface.sequelize.query(
      'SELECT * FROM Billings',
      { type: Sequelize.QueryTypes.SELECT }
    );

    // 刪除表
    await queryInterface.dropTable('Billings');

    // 重新創建舊版本的表
    await queryInterface.createTable('Billings', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      customerId: { type: Sequelize.INTEGER, allowNull: false },
      date: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      type: { type: Sequelize.ENUM('purchase', 'deposit'), allowNull: false },
      amount: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      description: { type: Sequelize.STRING, allowNull: true },
      status: { type: Sequelize.STRING, defaultValue: '已完成' },
      reference: { type: Sequelize.STRING, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW }
    });

    // 恢復數據（過濾掉 topup 類型的記錄）
    const filteredData = existingData.filter(record => record.type !== 'topup');
    if (filteredData.length > 0) {
      await queryInterface.bulkInsert('Billings', filteredData);
    }
  }
}; 