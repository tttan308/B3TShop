module.exports = (sequelize, DataTypes) => {
  const OrderDetail = sequelize.define(
    "OrderDetail",
    {
      OrderDetailID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      OrderID: { type: DataTypes.INTEGER },
    
      ProductID: { type: DataTypes.INTEGER },
      Quantity: { type: DataTypes.INTEGER },
      Price: { type: DataTypes.DECIMAL(10, 2) },

    },
    {
      timestamps: false,
    }
  );

  return OrderDetail;
};
