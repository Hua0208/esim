module.exports = (sequelize, DataTypes) => {
  const Billing = sequelize.define('Billing', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: true },
    date: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    type: { type: DataTypes.ENUM('purchase', 'deposit'), allowNull: false },
    amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.STRING, defaultValue: '已完成' },
    reference: { type: DataTypes.STRING, allowNull: true }
  }, {
    tableName: 'Billings'
  });

  Billing.associate = function(models) {
    Billing.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Billing;
}; 