const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const auth = require('../middleware/auth')
//const { Order } = require('../models')

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: 用戶 ID
 *         name:
 *           type: string
 *           description: 用戶名稱
 *         email:
 *           type: string
 *           format: email
 *           description: 電子郵件
 *         group:
 *           type: string
 *           description: 所屬群組名稱
 *         orderCount:
 *           type: integer
 *           description: 訂單數量
 *         note:
 *           type: string
 *           description: 備注
 *         orders:
 *           type: array
 *           description: 用戶訂單列表
 *           items:
 *             $ref: '#/components/schemas/Order'
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 訂單ID
 *         orderNumber:
 *           type: string
 *           description: 訂單編號
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: 建立時間
 *         status:
 *           type: string
 *           enum: [pending, processing, completed, cancelled]
 *           description: 訂單狀態
 *         amount:
 *           type: number
 *           description: 訂單金額
 *         productName:
 *           type: string
 *           description: 產品名稱
 *         customerName:
 *           type: string
 *           description: 客戶名稱
 *         iccid:
 *           type: string
 *           description: eSIM 的 ICCID
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: 獲取所有用戶
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 成功獲取用戶列表
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *   post:
 *     summary: 創建新用戶
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - groupId
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               groupId:
 *                 type: integer
 *               note:
 *                 type: string
 *     responses:
 *       201:
 *         description: 用戶創建成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: 獲取單個用戶詳情（包含訂單列表）
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 成功獲取用戶詳情
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: 用戶不存在
 *   put:
 *     summary: 更新用戶
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               groupId:
 *                 type: integer
 *               note:
 *                 type: string
 *     responses:
 *       200:
 *         description: 用戶更新成功
 *       404:
 *         description: 用戶不存在
 */

/**
 * @swagger
 * /api/users/{id}/note:
 *   patch:
 *     summary: 更新用戶備注
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - note
 *             properties:
 *               note:
 *                 type: string
 *     responses:
 *       200:
 *         description: 備注更新成功
 *       404:
 *         description: 用戶不存在
 */


// 獲取所有用戶
router.get('/', auth, userController.getAllUsers)

// 獲取單個用戶詳情（包含訂單列表）
router.get('/:id', auth, userController.getUserById)

// 創建新用戶
router.post('/', auth, userController.createUser)

// 更新用戶
router.put('/:id', auth, userController.updateUser)

// 更新用戶備注
router.patch('/:id/note', auth, userController.updateUserNote)

// 獲取訂單 ICCID
router.get('/orders/:orderId/iccid', auth, userController.getOrderICCID)

module.exports = router 