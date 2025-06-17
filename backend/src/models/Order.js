module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    orderNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    type: {
      type: DataTypes.ENUM('esim_realtime', 'esim_addon'),
      allowNull: false,
      defaultValue: 'esim_realtime'
    },
    status: {
      type: DataTypes.ENUM('pending', 'processing', 'completed', 'cancelled'),
      defaultValue: 'pending'
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    productId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Order.associate = function(models) {
    Order.belongsTo(models.User);
    Order.belongsTo(models.Product, {
      foreignKey: 'productId',
      targetKey: 'productId'
    });
    Order.hasOne(models.Card, {
      foreignKey: 'orderId',
      as: 'Card'
    });
  };

  return Order;
}; 