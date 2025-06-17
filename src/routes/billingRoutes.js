const express = require('express');
const router = express.Router();
const billingController = require('../controllers/billingController');

/**
 * @swagger
 * /api/billing/center:
 *   get:
 *     summary: 查詢帳務中心（總帳）
 *     tags:
 *       - Billing
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: 分頁頁碼
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: 每頁筆數
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         description: 用戶ID（可選，過濾單一用戶）
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [purchase, deposit]
 *         description: 帳務類型
 *       - in: query
 *         name: dateFrom
 *         schema:
 *           type: string
 *           format: date
 *         description: 起始日期
 *       - in: query
 *         name: dateTo
 *         schema:
 *           type: string
 *           format: date
 *         description: 結束日期
 *     responses:
 *       200:
 *         description: 帳務中心資料
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id: { type: integer }
 *                       userId: { type: integer }
 *                       date: { type: string, format: date-time }
 *                       type: { type: string }
 *                       amount: { type: number }
 *                       description: { type: string }
 *                       status: { type: string }
 *                       reference: { type: string }
 *                       User:
 *                         type: object
 *                         properties:
 *                           id: { type: integer }
 *                           name: { type: string }
 *                           email: { type: string }
 *                 currentBalance: { type: number }
 *                 monthlyStats:
 *                   type: object
 *                   properties:
 *                     buyCount: { type: integer }
 *                     depositCount: { type: integer }
 *                     totalSpent: { type: number }
 */
router.get('/center', billingController.getCenter);

/**
 * @swagger
 * /api/billing/add-balance:
 *   post:
 *     summary: 系統儲值
 *     tags:
 *       - Billing
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *                 description: 儲值金額（必須大於 0）
 *               note:
 *                 type: string
 *                 description: 儲值備註（選填）
 *     responses:
 *       200:
 *         description: 儲值成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code: { type: integer, example: 200 }
 *                 message: { type: string, example: "系統儲值成功" }
 *                 data:
 *                   type: object
 *                   properties:
 *                     billing:
 *                       type: object
 *                       properties:
 *                         id: { type: integer }
 *                         amount: { type: string }
 *                         type: { type: string, example: "deposit" }
 *                         note: { type: string }
 *                         date: { type: string, format: date-time }
 *                     currentBalance: { type: string }
 *       400:
 *         description: 參數錯誤
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code: { type: integer, example: 400 }
 *                 message: { type: string, example: "儲值金額必須大於 0" }
 *       500:
 *         description: 伺服器錯誤
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code: { type: integer, example: 500 }
 *                 message: { type: string, example: "系統儲值失敗" }
 */
router.post('/add-balance', billingController.addBalance);

module.exports = router; 