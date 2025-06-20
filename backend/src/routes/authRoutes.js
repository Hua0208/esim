const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

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
 *     LoginAttemptInfo:
 *       type: object
 *       properties:
 *         currentAttempts:
 *           type: integer
 *           description: 當前登入失敗次數
 *         maxAttempts:
 *           type: integer
 *           description: 最大允許嘗試次數
 *         remainingAttempts:
 *           type: integer
 *           description: 剩餘嘗試次數
 *         isLocked:
 *           type: boolean
 *           description: 是否被鎖定
 *         remainingLockTime:
 *           type: integer
 *           description: 剩餘鎖定時間（分鐘）
 *         lockedUntil:
 *           type: string
 *           format: date-time
 *           description: 鎖定結束時間
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
router.post('/login', authController.login);

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: 獲取用戶資料
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 成功獲取用戶資料
 *       401:
 *         description: 未授權
 *       404:
 *         description: 用戶不存在
 */
router.get('/profile', auth, authController.getProfile);

/**
 * @swagger
 * /api/auth/login-attempts/{userId}:
 *   get:
 *     summary: 獲取用戶登入嘗試次數資訊（管理員專用）
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 用戶 ID
 *     responses:
 *       200:
 *         description: 成功獲取登入嘗試次數資訊
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginAttemptInfo'
 *       401:
 *         description: 未授權
 *       403:
 *         description: 權限不足
 *       404:
 *         description: 用戶不存在
 */
router.get('/login-attempts/:userId', auth, authController.getLoginAttemptInfo);

/**
 * @swagger
 * /api/auth/unlock/{userId}:
 *   post:
 *     summary: 手動解鎖用戶帳號（管理員專用）
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 用戶 ID
 *     responses:
 *       200:
 *         description: 成功解鎖用戶帳號
 *       401:
 *         description: 未授權
 *       403:
 *         description: 權限不足
 *       404:
 *         description: 用戶不存在
 */
router.post('/unlock/:userId', auth, authController.unlockUser);

/**
 * @swagger
 * /api/auth/change-password:
 *   post:
 *     summary: 修改用戶密碼
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 format: password
 *                 description: 當前密碼
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 description: 新密碼
 *                 minLength: 8
 *     responses:
 *       200:
 *         description: 密碼修改成功
 *       400:
 *         description: 請求參數錯誤
 *       401:
 *         description: 當前密碼錯誤
 *       404:
 *         description: 用戶不存在
 *       500:
 *         description: 伺服器錯誤
 */
router.post('/change-password', auth, authController.changePassword);

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
router.get('/error', authController.handleError);

module.exports = router; 