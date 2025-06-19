const jwt = require('jsonwebtoken');
const { User } = require('../models');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: '未提供認證 Token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findByPk(decoded.id);

    if (!user || !user.isActive) {
      return res.status(401).json({ message: '用戶不存在或已被停用' });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    console.error('認證中間件錯誤:', error);
    res.status(401).json({ message: '認證失敗' });
  }
};

module.exports = auth; 