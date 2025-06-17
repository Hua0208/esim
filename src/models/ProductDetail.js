module.exports = (sequelize, DataTypes) => {
  const ProductDetail = sequelize.define('ProductDetail', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    providerName: DataTypes.STRING,
    providerLogo: DataTypes.STRING,
    retailPrice: DataTypes.FLOAT,
    currencyCode: DataTypes.STRING,
    regions: DataTypes.JSON,
    countries: DataTypes.JSON,
    planDataLimit: DataTypes.FLOAT,
    planValidity: DataTypes.INTEGER,
    planDataUnit: DataTypes.STRING,
    hotspot: DataTypes.INTEGER
  }, {
    tableName: 'ProductDetails'
  });

  ProductDetail.associate = function(models) {
    ProductDetail.belongsTo(models.Product, {
      foreignKey: 'productId',
      onDelete: 'CASCADE'
    });
  };

  return ProductDetail;
}; 