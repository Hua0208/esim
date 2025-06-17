const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite',
  logging: false // 關閉 SQL 查詢日誌
});

module.exports = sequelize; 