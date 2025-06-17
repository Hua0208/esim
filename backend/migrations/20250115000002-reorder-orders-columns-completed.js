'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 這個遷移記錄欄位順序調整已完成
    // Orders 表的欄位順序現在是：
    // id, orderNumber, type, status, amount, productId, createdAt, updatedAt, UserId
    console.log('Orders 表欄位順序調整已完成');
  },

  down: async (queryInterface, Sequelize) => {
    // 如果需要回滾，可以重新建立原始順序的表
    console.log('如需回滾欄位順序，請手動執行 SQL');
  }
}; 