module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        UserID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        Username: { type: DataTypes.STRING },
        PasswordHash: { type: DataTypes.STRING },
        FullName: { type: DataTypes.STRING },
        Email: { type: DataTypes.STRING },
        PhoneNumber: { type: DataTypes.STRING },
        isAdmin: { type: DataTypes.BOOLEAN },
        AuthenticationType: { type: DataTypes.STRING },
        AuthProviderID: { type: DataTypes.STRING },
        AuthProviderToken: { type: DataTypes.STRING },
        DateCreated: { type: DataTypes.DATE }
    });

    return User;
}