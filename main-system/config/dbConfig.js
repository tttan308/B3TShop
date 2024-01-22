require('dotenv').config();

// Cấu hình cho kết nối database
const dbConfig = {
  host: process.env.HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DB,
  username: process.env.DB_USER,
  password: process.env.DB_PW,
  dialect: 'postgres',
  pool: {
    max: 30,
  },
};

module.exports = dbConfig;
