const jwt = require('jsonwebtoken');
const { User } = require('../models');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: '未提供認證 Token' });
    }

    let user;

    try {
      // 只使用 JWT token 驗證
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      user = await User.findByPk(decoded.id);
      
      if (user) {
      }
    } catch (jwtError) {
      return res.status(401).json({ message: '認證失敗：無效的 JWT token' });
      
      console.log('JWT 解析失敗，嘗試 base64 編碼:', jwtError.message);
      
      // 如果不是JWT，嘗試解析為base64編碼的用戶資料
      try {
        const userData = JSON.parse(Buffer.from(token, 'base64').toString());
        user = await User.findOne({
          where: {
            username: userData.username,
            isActive: true
          }
        });
        
        if (user) {
          console.log('Base64 認證成功:', { userId: user.id, username: user.username });
        }
      } catch (base64Error) {
        console.error('Token解析失敗:', { jwtError: jwtError.message, base64Error: base64Error.message });
        return res.status(401).json({ message: '認證失敗：無效的 token 格式' });
      }
      */
    }

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