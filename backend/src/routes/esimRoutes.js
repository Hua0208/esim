const express = require('express');
const router = express.Router();
const esimController = require('../controllers/esimController');
const { body, param, query, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const mobimatterService = require('../services/mobimatterService');
const { Product, ProductDetail, Order } = require('../models');

// 驗證中間件
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

/**
 * @swagger
 * /api/esim:
 *   post:
 *     summary: 購買 eSIM
 *     tags: [eSIM]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - customerId
 *             properties:
 *               productId:
 *                 type: string
 *                 description: 產品 ID
 *               customerId:
 *                 type: integer
 *                 minimum: 1
 *                 description: 客戶 ID（必須大於 0）
 *     responses:
 *       200:
 *         description: 購買成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderId:
 *                   type: string
 *                   description: 訂單編號
 *                 status:
 *                   type: string
 *                   description: 訂單狀態
 *                 productCategory:
 *                   type: string
 *                   description: 產品類別
 *       400:
 *         description: 請求參數錯誤（customerId 必須大於 0）
 *       404:
 *         description: 產品或客戶不存在
 *       500:
 *         description: 伺服器錯誤
 */
router.post(
    '/',
    [
        body('productId').isString().notEmpty(),
        body('customerId').isInt({ min: 1 }).withMessage('客戶 ID 必須大於 0'),
        validate
    ],
    asyncHandler(esimController.purchaseESim)
);

/**
 * @swagger
 * /api/esim/complete:
 *   post:
 *     summary: 完成訂單
 *     tags: [eSIM]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *             properties:
 *               orderId:
 *                 type: integer
 *                 description: 資料庫中的訂單 ID
 *     responses:
 *       200:
 *         description: 訂單完成
 *       400:
 *         description: 請求參數錯誤
 *       500:
 *         description: 伺服器錯誤
 */
router.post('/complete',
    [
        body('orderId').isInt({ min: 1 }).withMessage('訂單 ID 必須大於 0'),
        validate
    ],
    asyncHandler(async (req, res) => {
        const { orderId } = req.body;
        // 查詢訂單
        const order = await Order.findOne({
            where: { id: orderId }
        });
        if (!order) {
            return res.status(404).json({ error: '找不到訂單' });
        }
        // 把 orderNumber 傳給 controller
        req.body.orderId = order.orderNumber; // 這裡覆蓋成訂單號
        await esimController.completeOrder(req, res);
    })
);

/**
 * @swagger
 * /api/esim/order:
 *   get:
 *     summary: 根據 ICCID 查詢訂單
 *     tags: [eSIM]
 *     parameters:
 *       - in: query
 *         name: iccid
 *         required: true
 *         schema:
 *           type: string
 *         description: eSIM 的 ICCID
 *     responses:
 *       200:
 *         description: 成功獲取訂單資訊
 *       400:
 *         description: 請求參數錯誤
 *       500:
 *         description: 伺服器錯誤
 */
router.get('/order',
    [
        query('iccid').isString().notEmpty(),
        validate
    ],
    asyncHandler(esimController.getOrderByICCID)
);

/**
 * @swagger
 * /api/esim/provider-info/{orderId}:
 *   get:
 *     summary: 查詢 provider info
 *     tags: [eSIM]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: 訂單 ID
 *     responses:
 *       200:
 *         description: 成功獲取 provider 資訊
 *       400:
 *         description: 請求參數錯誤
 *       500:
 *         description: 伺服器錯誤
 */
router.get('/provider-info/:orderId',
    [
        param('orderId').isString().notEmpty(),
        validate
    ],
    asyncHandler(esimController.getProviderInfo)
);

/**
 * @swagger
 * /api/esim/topup:
 *   post:
 *     summary: 加值 eSIM
 *     tags: [eSIM]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - orderId
 *             properties:
 *               productId:
 *                 type: string
 *                 description: 加值的流量包產品 ID
 *               orderId:
 *                 type: integer
 *                 description: 資料庫中的訂單 ID
 *     responses:
 *       200:
 *         description: 儲值成功
 *       400:
 *         description: 請求參數錯誤
 *       404:
 *         description: 找不到訂單
 *       500:
 *         description: 伺服器錯誤
 */
router.post('/topup',
    [
        body('productId').isString().notEmpty(),
        body('orderId').isInt({ min: 1 }).withMessage('訂單 ID 必須大於 0'),
        validate
    ],
    asyncHandler(esimController.topUpESim)
);

/**
 * @swagger
 * /api/esim/product-networks/{productId}:
 *   get:
 *     summary: 查詢產品可用網路
 *     tags: [eSIM]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: 產品 ID
 *     responses:
 *       200:
 *         description: 成功獲取網路列表
 *       400:
 *         description: 請求參數錯誤
 *       500:
 *         description: 伺服器錯誤
 */
router.get('/product-networks/:productId',
    [
        param('productId').isString().notEmpty(),
        validate
    ],
    asyncHandler(esimController.getProductNetworks)
);

module.exports = router; 