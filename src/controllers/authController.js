const responseHandler = require('../utils/responseHandler');

const authController = {
    // 用戶登入
    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            // Demo 帳號驗證
            if (username === 'admin' && password === 'admin') {
                const user = {
                    id: 1,
                    fullName: 'John Doe',
                    username: 'admin',
                    avatar: '/images/avatars/avatar-cat.png',
                    email: 'admin@demo.com',
                    role: 'admin',
                    abilityRules: [
                        { action: 'manage', subject: 'all' }
                    ]
                };
                
                return res.json({
                    user,
                    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MX0.fhc3wykrAnRpcKApKhXiahxaOe8PSHatad31NuIZ0Zg'
                });
            } else if (username === 'client' && password === 'client') {
                const user = {
                    id: 2,
                    fullName: 'Jane Doe',
                    username: 'client',
                    avatar: '/images/avatars/avatar-2.png',
                    email: 'client@demo.com',
                    role: 'client',
                    abilityRules: [
                        { action: 'read', subject: 'Auth' },
                        { action: 'read', subject: 'AclDemo' }
                    ]
                };
                
                return res.json({
                    user,
                    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mn0.cat2xMrZLn0FwicdGtZNzL7ifDTAKWB0k1RurSWjdnw'
                });
            } else {
                return responseHandler.unauthorized(res, '帳號或密碼錯誤');
            }
        } catch (error) {
            console.error('登入失敗:', error);
            return responseHandler.error(res, '登入失敗', 500, error.message);
        }
    },

    // 錯誤處理
    handleError: async (req, res) => {
        try {
            const { error } = req.query;
            const errorData = JSON.parse(error);
            
            return res.status(errorData.status || 500).json({
                message: errorData.message || '發生錯誤'
            });
        } catch (e) {
            console.error('錯誤處理失敗:', e);
            return responseHandler.error(res, '錯誤處理失敗', 500, e.message);
        }
    }
};

module.exports = authController; 