module.exports = (sequelize, DataTypes) => {
    const CartItem = sequelize.define('CartItem', {
        CartItemID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        CartID: { type: DataTypes.INTEGER },
        ProductID: { type: DataTypes.INTEGER },
        Quantity: { type: DataTypes.INTEGER }
    },{
        timestamps: false,
    });

    return CartItem;
};
