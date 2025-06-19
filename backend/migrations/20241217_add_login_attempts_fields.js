'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'loginAttempts', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '登入失敗次數'
    });

    await queryInterface.addColumn('Users', 'lockedUntil', {
      type: Sequelize.DATE,
      allowNull: true,
      comment: '帳號鎖定時間'
    });

    await queryInterface.addColumn('Users', 'lastFailedLoginAt', {
      type: Sequelize.DATE,
      allowNull: true,
      comment: '最後登入失敗時間'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'loginAttempts');
    await queryInterface.removeColumn('Users', 'lockedUntil');
    await queryInterface.removeColumn('Users', 'lastFailedLoginAt');
  }
}; 