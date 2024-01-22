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


db.users = require('./User')(sequelize, DataTypes);
db.products = require('./Product')(sequelize, DataTypes);
db.categories = require('./Category')(sequelize, DataTypes);
db.orders = require('./Order')(sequelize, DataTypes);
db.orderDetails = require('./OrderDetail')(sequelize, DataTypes);
db.carts = require('./Cart')(sequelize, DataTypes);
db.cartItems = require('./CartItem')(sequelize, DataTypes);
db.tokenLogs = require('./TokenLogs')(sequelize, DataTypes);


db.sequelize.sync(
    { force: false } // force = false có nghĩa là nếu bảng đã tồn tại thì sẽ không tạo lại nữa, đồng thời nó sẽ không xóa dữ liệu cũ đi
)
    .then(() => {
        console.log('yes re-sync done!')
    })

// Relationship

// Users - Orders: One-to-Many
db.users.hasMany(db.orders, { foreignKey: 'UserID' });
db.orders.belongsTo(db.users, { foreignKey: 'UserID' });

// Users - Cart: One-to-One
db.users.hasOne(db.carts, { foreignKey: 'UserID' });
db.carts.belongsTo(db.users, { foreignKey: 'UserID' });

// Cart - CartItems: One-to-Many
db.carts.hasMany(db.cartItems, { foreignKey: 'CartID' });
db.cartItems.belongsTo(db.carts, { foreignKey: 'CartID' });

// Products - CartItems: One-to-Many
db.products.hasMany(db.cartItems, { foreignKey: 'ProductID' });
db.cartItems.belongsTo(db.products, { foreignKey: 'ProductID' });

// Orders - OrderDetails: One-to-Many
db.orders.hasMany(db.orderDetails, { foreignKey: 'OrderID' });
db.orderDetails.belongsTo(db.orders, { foreignKey: 'OrderID' });

// Products - OrderDetails: One-to-Many
db.products.hasMany(db.orderDetails, { foreignKey: 'ProductID' });
db.orderDetails.belongsTo(db.products, { foreignKey: 'ProductID' });

// Categories - Products: One-to-Many
db.categories.hasMany(db.products, { foreignKey: 'CategoryID' });
db.products.belongsTo(db.categories, { foreignKey: 'CategoryID' });

module.exports = db