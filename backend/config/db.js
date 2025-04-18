const mysql = require('mysql2');
require('dotenv').config({ path: __dirname + '/../.env' });

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',    // 环境变量优先
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,                   // 强制要求环境变量
  password: process.env.DB_PASSWORD,           // 强制要求环境变量
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,     // 连接池大小
  queueLimit: 0,
  timezone: '+08:00'       // 建议设置时区（如北京时间东八区）
});

// 导出Promise接口
module.exports = pool.promise();