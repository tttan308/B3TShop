module.exports = (sequelize, DataTypes) => {
    const TokenLogs = sequelize.define('TokenLogs', {
        TokenLogID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        Token: { type: DataTypes.STRING },
        IssuedToSystem: { type: DataTypes.STRING },
        IssuedDate: { type: DataTypes.DATE },
        ExpiryDate: { type: DataTypes.DATE }
    });

    return TokenLogs;
};
