module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    ProductID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ProductName: { type: DataTypes.STRING },
    Description: { type: DataTypes.TEXT },
    Price: { type: DataTypes.DECIMAL(10, 2) },
    StockQuantity: { type: DataTypes.INTEGER },
    CategoryID: { type: DataTypes.INTEGER },
    ImageURL: { type: DataTypes.STRING },
    Discount: { type: DataTypes.INTEGER },
    Detail: { type: DataTypes.TEXT },
  }, {
    timestamps: false,
  });

  return Product;
};
