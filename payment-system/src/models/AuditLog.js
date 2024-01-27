module.exports = (sequelize, DataTypes) => {
    const AuditLog = sequelize.define('AuditLog', {
        LogID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        TransactionID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        AuditDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        Status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        CreatedBy: {
            type: DataTypes.STRING,
            allowNull: false
        },
        CreatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        UpdatedBy: {
            type: DataTypes.STRING
        },
        UpdatedAt: {
            type: DataTypes.DATE
        },
        ActionDescription: {
            type: DataTypes.TEXT
        }
    }, {
        timestamps: false
    });

    return AuditLog;
};
