// routes/auth.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');
const database = require('../config/db');
const { v4: uuid } = require('uuid');

// 登录接口(已通过，本地token已创建并储存)
router.post('/login', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    // 检查 JWT 密钥配置
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET 环境变量未配置');
    }

    // 验证用户是否存在(查询待优化，后期会进行封装)
    const [[user]] = await database.query(
      'SELECT id,username,password FROM user WHERE username = ? LIMIT 1',
      [username]
    );


    if (!user) {
      return res.status(404).json({ msg: '无用户信息，请注册' });
    }

    // 注册后对比加密密码
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: '密码错误' });
    }

    // 生成 JWT（Promise 化）
    const payload = { user: { id: user.id } };
    const token = await new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        jwtConfig.secret,           // 使用配置项
        {
          expiresIn: jwtConfig.expiresIn,
          algorithm: jwtConfig.algorithm
        },
        (err, token) => (err ? reject(err) : resolve(token))
      );
    });
    res.json({ token });
  } catch (err) {
    console.error(err.stack);  // 输出完整堆栈
    res.status(500).send('服务器错误');
  }
});

// 注册接口(已通过，密码在后端加密并存储到数据库中)
router.post('/register', async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      data: { code: 400, error: '请求体为空' }
    });
  }
  const { username, phone, email, password } = req.body;
  // 检查用户是否存在
  const [existingUsers] = await database.query(
    `SELECT 
      SUM(username = ?) AS username_exists,
      SUM(email = ?) AS email_exists,
      SUM(phone = ?) AS phone_exists
    FROM user`,
    [username, email, phone]
  );

  // 解析冲突结果
  const conflicts = {
    username: existingUsers[0].username_exists > 0,
    email: existingUsers[0].email_exists > 0,
    phone: existingUsers[0].phone_exists > 0
  };

  const conflictFields = [];
  if (conflicts.username) conflictFields.push('用户名');
  if (conflicts.email) conflictFields.push('邮箱');
  if (conflicts.phone) conflictFields.push('手机号');

  // 检查用户是否存在
  if (conflictFields.length > 0) {
    return res.status(409).json({
      code: 409,
      error: `${conflictFields.join('、')}重复`,
      conflicts // 返回具体冲突字段
    });
  } else {
    // 不存在则插入用户数据
    var id = uuid();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const addResult = await database.query(
      `INSERT INTO user 
             (id, username, phone, email, password) 
             VALUES (?, ?, ?, ?, ?)`,
      [id, username, phone, email, hashedPassword]
    );
    // 检查插入是否成功
    if (addResult[0].affectedRows === 0) {
      return res.status(500).json(
        { code: 500, error: '注册失败' }
      );
    }
    // 插入成功
    if (addResult[0].affectedRows === 1) {
      return res.status(201).json(
        { code: 201, message: '注册成功' }
      );
    }
  }
});

module.exports = router;

// 获取用户列表(查询测试)
// router.get('/users', async (req, res) => {
//   try {
//     const [rows, fields] = await database.query('SELECT * FROM user');
//     res.json(rows);
//   } catch (err) {
//     console.error('Error fetching users:', err);
//     res.status(500).json({ error: 'Failed to fetch users' });
//   }
// });














