const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: 產品管理 API
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: 取得所有產品
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: productCategory
 *         schema:
 *           type: string
 *         description: 產品類型過濾
 *     responses:
 *       200:
 *         description: 成功取得產品列表
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: 伺服器錯誤
 */
router.get('/', auth, productController.getAllProducts);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: 新增產品
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: 成功新增產品
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: 伺服器錯誤
 */
router.post('/', auth, productController.createProduct);

/**
 * @swagger
 * /api/products/{id}/details:
 *   put:
 *     summary: 更新產品詳細資訊
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 產品 ID
 *     responses:
 *       200:
 *         description: 成功更新產品詳細資訊
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: 找不到產品
 *       500:
 *         description: 伺服器錯誤
 */
router.put('/:id/details', auth, productController.updateProductDetails);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: 刪除產品
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 產品 ID
 *     responses:
 *       200:
 *         description: 成功刪除產品
 *       404:
 *         description: 找不到產品
 *       500:
 *         description: 伺服器錯誤
 */
router.delete('/:id', auth, productController.deleteProduct);

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 產品 ID
 *         productId:
 *           type: string
 *           description: 產品編號
 *         name:
 *           type: string
 *           description: 產品名稱
 *         type:
 *           type: string
 *           enum: [esim_realtime, esim_addon]
 *           description: 產品類型
 *         enabled:
 *           type: boolean
 *           description: 是否啟用
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: 建立時間
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: 更新時間
 *         mobimatterDetails:
 *           type: object
 *           description: Mobimatter 產品詳細資訊
 *           properties:
 *             providerName:
 *               type: string
 *               description: 供應商名稱
 *             providerLogo:
 *               type: string
 *               description: 供應商 Logo URL
 *             retailPrice:
 *               type: number
 *               description: 零售價格
 *             currencyCode:
 *               type: string
 *               description: 貨幣代碼
 *             regions:
 *               type: array
 *               items:
 *                 type: string
 *               description: 可用地區
 *             countries:
 *               type: array
 *               items:
 *                 type: string
 *               description: 可用國家
 *             productDetails:
 *               type: object
 *               description: 詳細資訊
 *     ProductInput:
 *       type: object
 *       required:
 *         - productId
 *         - name
 *       properties:
 *         productId:
 *           type: string
 *           description: 產品編號
 *         name:
 *           type: string
 *           description: 產品名稱
 *         enabled:
 *           type: boolean
 *           description: 是否啟用
 *           default: true
 */

module.exports = router; 