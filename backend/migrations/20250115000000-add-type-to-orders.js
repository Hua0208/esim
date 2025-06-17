'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Orders', 'type', {
      type: Sequelize.ENUM('esim_realtime', 'esim_addon'),
      allowNull: false,
      defaultValue: 'esim_realtime',
      after: 'orderNumber'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Orders', 'type');
  }
}; 