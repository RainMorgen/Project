// config/jwt.config.js
require('dotenv').config({ path: __dirname + '/../.env' });

module.exports = {
  secret: process.env.JWT_SECRET,      // 必须配置项
  expiresIn: process.env.JWT_EXPIRES_IN || '1h',  // 默认 1 小时
  algorithm: 'HS256',               // 推荐签名算法
  issuer: process.env.JWT_ISSUER || 'localhost',   // 签发方标识
  // 前端标识
  audience: process.env.JWT_AUDIENCE || ['web', 'mobile'] // 接收方标识
};