module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
        TransactionID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        AccountID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        TransactionDate: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        timestamps: false
    });

    return Transaction;
};
