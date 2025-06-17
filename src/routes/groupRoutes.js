const express = require('express')
const router = express.Router()
const groupController = require('../controllers/groupController')

/**
 * @swagger
 * components:
 *   schemas:
 *     Group:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: 群組 ID
 *         name:
 *           type: string
 *           description: 群組名稱
 *         description:
 *           type: string
 *           description: 群組描述
 *         memberCount:
 *           type: integer
 *           description: 群組成員數量
 */

/**
 * @swagger
 * /api/groups:
 *   get:
 *     summary: 獲取所有群組
 *     tags: [Groups]
 *     responses:
 *       200:
 *         description: 成功獲取群組列表
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Group'
 *   post:
 *     summary: 創建新群組
 *     tags: [Groups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: 群組創建成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 */

/**
 * @swagger
 * /api/groups/{id}:
 *   put:
 *     summary: 更新群組
 *     tags: [Groups]
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
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: 群組更新成功
 *       404:
 *         description: 群組不存在
 */

// 獲取所有群組
router.get('/', groupController.getAllGroups)

// 創建新群組
router.post('/', groupController.createGroup)

// 更新群組
router.put('/:id', groupController.updateGroup)

module.exports = router 