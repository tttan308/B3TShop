module.exports = (sequelize, DataTypes) => {
    const PaymentAccount = sequelize.define('PaymentAccount', {
        AccountID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        UserID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Balance: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
        timestamps: false
    });

    return PaymentAccount;
};
