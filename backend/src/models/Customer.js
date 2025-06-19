module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'Customers',
    timestamps: true
  });

  Customer.associate = function(models) {
    Customer.belongsTo(models.Group);
    Customer.hasMany(models.Order);
    Customer.hasMany(models.Billing, { foreignKey: 'customerId', as: 'Billings' });
  };

  return Customer;
}; 