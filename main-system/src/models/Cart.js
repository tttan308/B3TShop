module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
        CartID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        UserID: { type: DataTypes.INTEGER },
        DateCreated: { type: DataTypes.DATE }
    });

    return Cart;
};
