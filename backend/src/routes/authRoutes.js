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
 *         totpToken:
 *           type: string
 *           description: TOTP 驗證碼（如果啟用了 TOTP）
 *           example: "123456"
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
 *             totpEnabled:
 *               type: boolean
 *               description: 是否啟用 TOTP
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
 *     LoginTotpRequiredResponse:
 *       type: object
 *       properties:
 *         requireTotp:
 *           type: boolean
 *           description: 需要 TOTP 驗證
 *           example: true
 *         userId:
 *           type: integer
 *           description: 用戶 ID
 *         message:
 *           type: string
 *           description: 提示訊息
 *           example: "需要 TOTP 驗證"
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
 *               oneOf:
 *                 - $ref: '#/components/schemas/LoginResponse'
 *                 - $ref: '#/components/schemas/LoginTotpRequiredResponse'
 *       401:
 *         description: 帳號或密碼錯誤
 *       500:
 *         description: 伺服器錯誤
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: 用戶登出
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: 登出成功
 */
router.post('/logout', authController.logout);

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
 * /api/auth/unlock-user/{userId}:
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
router.post('/unlock-user/:userId', auth, authController.unlockUser);

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
 * /api/auth/totp/setup:
 *   get:
 *     summary: 生成 TOTP 設置
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 成功生成 TOTP 設置
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 secret:
 *                   type: string
 *                   description: TOTP secret (base32 編碼)
 *                 qrCode:
 *                   type: string
 *                   description: QR code 圖片 (data URL)
 *                 otpauthUrl:
 *                   type: string
 *                   description: otpauth URL
 *       400:
 *         description: TOTP 已經啟用
 *       401:
 *         description: 未授權
 *       404:
 *         description: 用戶不存在
 */
router.get('/totp/setup', auth, authController.generateTotpSetup);

/**
 * @swagger
 * /api/auth/totp/enable:
 *   post:
 *     summary: 驗證並啟用 TOTP
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
 *               - secret
 *               - token
 *             properties:
 *               secret:
 *                 type: string
 *                 description: TOTP secret
 *               token:
 *                 type: string
 *                 description: 6位數驗證碼
 *     responses:
 *       200:
 *         description: TOTP 啟用成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 backupCodes:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: 備用代碼列表
 *       400:
 *         description: 請求參數錯誤或 TOTP 已經啟用
 *       401:
 *         description: 驗證碼錯誤
 *       404:
 *         description: 用戶不存在
 */
router.post('/totp/enable', auth, authController.enableTotp);

/**
 * @swagger
 * /api/auth/totp/disable:
 *   post:
 *     summary: 禁用 TOTP
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
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *                 description: 用戶密碼
 *     responses:
 *       200:
 *         description: TOTP 已禁用
 *       400:
 *         description: 請求參數錯誤
 *       401:
 *         description: 密碼錯誤
 *       404:
 *         description: 用戶不存在
 */
router.post('/totp/disable', auth, authController.disableTotp);

/**
 * @swagger
 * /api/auth/totp/regenerate-backup:
 *   post:
 *     summary: 重新生成備用代碼
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
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *                 description: 用戶密碼
 *     responses:
 *       200:
 *         description: 備用代碼重新生成成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 backupCodes:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: 新的備用代碼列表
 *       400:
 *         description: 請求參數錯誤或 TOTP 未啟用
 *       401:
 *         description: 密碼錯誤
 *       404:
 *         description: 用戶不存在
 */
router.post('/totp/regenerate-backup', auth, authController.regenerateBackupCodes);

/**
 * @swagger
 * /api/auth/totp/backup:
 *   post:
 *     summary: 使用備用代碼並獲取登入 token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - backupCode
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: 用戶 ID
 *                 example: 1
 *               backupCode:
 *                 type: string
 *                 description: 備用代碼
 *                 example: "ABCD123456"
 *     responses:
 *       200:
 *         description: 備用代碼驗證成功，返回用戶資料和 token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: 用戶 ID
 *                     username:
 *                       type: string
 *                       description: 用戶名稱
 *                     fullName:
 *                       type: string
 *                       description: 用戶全名
 *                     email:
 *                       type: string
 *                       description: 電子郵件
 *                     role:
 *                       type: string
 *                       description: 用戶角色
 *                     avatar:
 *                       type: string
 *                       description: 頭像 URL
 *                     totpEnabled:
 *                       type: boolean
 *                       description: 是否啟用 TOTP
 *                     abilityRules:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           action:
 *                             type: string
 *                           subject:
 *                             type: string
 *                 accessToken:
 *                   type: string
 *                   description: JWT 訪問令牌
 *       400:
 *         description: 請求參數錯誤或 TOTP 未啟用
 *       401:
 *         description: 備用代碼錯誤
 *       404:
 *         description: 用戶不存在
 */
router.post('/totp/backup', authController.useBackupCode);

module.exports = router; 