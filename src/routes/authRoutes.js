const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: 認證相關 API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginInput:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: 用戶名稱
 *           example: admin
 *         password:
 *           type: string
 *           format: password
 *           description: 用戶密碼
 *           example: admin
 *     LoginResponse:
 *       type: object
 *       properties:
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: 用戶 ID
 *             fullName:
 *               type: string
 *               description: 用戶全名
 *             username:
 *               type: string
 *               description: 用戶名稱
 *             avatar:
 *               type: string
 *               description: 頭像 URL
 *             email:
 *               type: string
 *               description: 電子郵件
 *             role:
 *               type: string
 *               enum: [admin, client]
 *               description: 用戶角色
 *             abilityRules:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   action:
 *                     type: string
 *                     description: 權限動作
 *                   subject:
 *                     type: string
 *                     description: 權限對象
 *         accessToken:
 *           type: string
 *           description: JWT 訪問令牌
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: 用戶登入
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: 登入成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: 帳號或密碼錯誤
 *       500:
 *         description: 伺服器錯誤
 */
router.post('/login', async (req, res) => {
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
            return res.status(401).json({ message: '帳號或密碼錯誤' });
        }
    } catch (error) {
        res.status(500).json({ 
            message: '登入失敗',
            error: error.message 
        });
    }
});

/**
 * @swagger
 * /api/auth/error:
 *   get:
 *     summary: 錯誤處理
 *     tags: [Authentication]
 *     parameters:
 *       - in: query
 *         name: error
 *         schema:
 *           type: string
 *         description: 錯誤信息（JSON 字符串）
 *     responses:
 *       200:
 *         description: 成功處理錯誤
 *       500:
 *         description: 錯誤處理失敗
 */
router.get('/error', (req, res) => {
    const { error } = req.query;
    try {
        const errorData = JSON.parse(error);
        res.status(errorData.status || 500).json({
            message: errorData.message || '發生錯誤'
        });
    } catch (e) {
        res.status(500).json({
            message: '錯誤處理失敗'
        });
    }
});

module.exports = router; 