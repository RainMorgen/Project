// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const database = require('././config/db');
const app = express();
const PORT = process.env.PORT || 8080;

// 跨域设置(使用cors作为中间件解决问题)
const corsOptions = {
  // 允许跨域的域名，*代表允许任意域名
  origin: 'http://localhost:5173',
  // 允许跨域的方法
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  // 允许跨域的请求头
  allowedHeaders: ['Content-Type'],
  // 允许跨域的响应头
  credentials: true,
  // 预检请求的缓存时间
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// 路由配置
app.use('/api', authRoutes);

// 监听端口
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 测试数据库连接
// async function testConnection() {
//   try {
//     const [rows, fields] = await database.query('SELECT 1 + 1 AS solution');
//     console.log('Database connection successful:', rows[0].solution); // 应输出 2
//   } catch (err) {
//     console.error('Database connection error:', err);
//   }
// }

// testConnection();