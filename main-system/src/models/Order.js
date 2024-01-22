module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        OrderID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        UserID: { type: DataTypes.INTEGER },
        OrderDate: { type: DataTypes.DATE },
        TotalAmount: { type: DataTypes.DECIMAL(10, 2) },
        Status: { type: DataTypes.STRING }
    });

    return Order;
};
