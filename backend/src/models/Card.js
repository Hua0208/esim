module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('Card', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    customerId: { type: DataTypes.INTEGER, allowNull: false },
    orderId: { type: DataTypes.INTEGER, allowNull: false },
    iccid: { type: DataTypes.STRING, allowNull: false, unique: true },
    purchasedAt: { type: DataTypes.DATE, allowNull: false },
    expiredAt: { type: DataTypes.DATE, allowNull: true },
    qrcode: { type: DataTypes.TEXT, allowNull: true },
    esimInfo: { type: DataTypes.JSON, allowNull: true }
  }, {
    tableName: 'Cards',
    timestamps: false
  });

  Card.associate = function(models) {
    Card.belongsTo(models.Customer, { foreignKey: 'customerId' });
    Card.belongsTo(models.Order, { foreignKey: 'orderId' });
  };

  return Card;
}; 