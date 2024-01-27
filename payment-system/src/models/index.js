const dbConfig = require('../../config/dbConfig');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        pool: dbConfig.pool,
        logging: false
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.auditLogs = require('./AuditLog')(sequelize, DataTypes);
db.transactions = require('./Transaction')(sequelize, DataTypes);
db.paymentAccounts = require('./PaymentAccount')(sequelize, DataTypes);

db.sequelize.sync(
    { force: false } // force = false có nghĩa là nếu bảng đã tồn tại thì sẽ không tạo lại nữa, đồng thời nó sẽ không xóa dữ liệu cũ đi
)
    .then(() => {
        console.log('yes re-sync done!')
    })

// Relationship
db.paymentAccounts.hasMany(db.transactions, {
    foreignKey: 'AccountID',
    as: 'transactions'
});
db.transactions.belongsTo(db.paymentAccounts, {
    foreignKey: 'AccountID',
    as: 'paymentAccount'
});

db.transactions.hasMany(db.auditLogs, {
    foreignKey: 'TransactionID',
    as: 'auditLogs'
});
db.auditLogs.belongsTo(db.transactions, {
    foreignKey: 'TransactionID',
    as: 'transaction'
});

module.exports = db;
