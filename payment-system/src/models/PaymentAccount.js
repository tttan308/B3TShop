module.exports = (sequelize, DataTypes) => {
    const PaymentAccount = sequelize.define('PaymentAccount', {
        AccountID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Username: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        Balance: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false
        }
    }, {
        timestamps: false
    });

    return PaymentAccount;
};
