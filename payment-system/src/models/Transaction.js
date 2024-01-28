module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
        TransactionID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Username: {
            type: DataTypes.STRING(50),
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
