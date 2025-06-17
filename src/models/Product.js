module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    productCategory: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });

  Product.associate = function(models) {
    Product.hasMany(models.Order, {
      foreignKey: 'productId',
      sourceKey: 'productId'
    });
    Product.hasOne(models.ProductDetail, {
      foreignKey: 'productId',
      onDelete: 'CASCADE'
    });
  };

  return Product;
}; 