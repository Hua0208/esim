const { Customer, Group, Order, Product, Card, ProductDetail } = require('../models')
const { Sequelize } = require('sequelize')
const sequelize = require('../db')
const responseHandler = require('../utils/responseHandler')
const Big = require('big.js')
const dayjs = require('dayjs')

const userController = {
  // 獲取所有用戶
  async getAllUsers(req, res) {
    try {
      const users = await Customer.findAll({
        include: [
          {
            model: Group,
            attributes: ['id', 'name']
          }
        ],
        attributes: {
          include: [
            [sequelize.literal('(SELECT COUNT(*) FROM Orders WHERE Orders.CustomerId = Customer.id)'), 'orderCount'],
            [sequelize.literal('(SELECT COALESCE(SUM(amount), 0) FROM Orders WHERE Orders.CustomerId = Customer.id AND Orders.status = \'completed\')'), 'totalSpent']
          ]
        },
        group: ['Customer.id', 'Group.id', 'Group.name']
      })

      const formattedUsers = users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        group: user.Group.name,
        orderCount: parseInt(user.getDataValue('orderCount')),
        totalSpent: parseFloat(user.getDataValue('totalSpent')),
        note: user.note
      }))

      return responseHandler.success(res, formattedUsers, '成功獲取用戶列表')
    } catch (error) {
      console.error('獲取用戶列表失敗:', error)
      return responseHandler.error(res, '獲取用戶列表失敗', 500, error.message)
    }
  },

  // 創建用戶
  async createUser(req, res) {
    try {
      const { name, email, groupId, note } = req.body

      const user = await Customer.create({
        name,
        email,
        GroupId: groupId,
        note
      })

      return responseHandler.success(res, user, '用戶創建成功', 201)
    } catch (error) {
      console.error('創建用戶失敗:', error)
      return responseHandler.error(res, '創建用戶失敗', 500, error.message)
    }
  },

  // 更新用戶
  async updateUser(req, res) {
    try {
      const { id } = req.params
      const { name, email, groupId, note } = req.body

      const user = await Customer.findByPk(id)
      if (!user) {
        return responseHandler.notFound(res, '用戶不存在')
      }

      await user.update({
        name,
        email,
        GroupId: groupId,
        note
      })

      return responseHandler.success(res, user, '用戶更新成功')
    } catch (error) {
      console.error('更新用戶失敗:', error)
      return responseHandler.error(res, '更新用戶失敗', 500, error.message)
    }
  },

  // 更新用戶備注
  async updateUserNote(req, res) {
    try {
      const { id } = req.params
      const { note } = req.body

      const user = await Customer.findByPk(id)
      if (!user) {
        return responseHandler.notFound(res, '用戶不存在')
      }

      await user.update({ note })
      return responseHandler.success(res, user, '用戶備注更新成功')
    } catch (error) {
      console.error('更新用戶備注失敗:', error)
      return responseHandler.error(res, '更新用戶備注失敗', 500, error.message)
    }
  },

  // 獲取用戶訂單
  async getUserOrders(req, res) {
    try {
      const { id } = req.params

      const orders = await Order.findAll({
        where: { CustomerId: id },
        include: [
          {
            model: Customer,
            attributes: ['id', 'name']
          },
          {
            model: Product,
            attributes: ['productId', 'name', 'description']
          }
        ],
        order: [['createdAt', 'DESC']]
      })

      const formattedOrders = orders.map(order => ({
        id: order.id,
        orderNumber: order.orderNumber,
        type: order.type,
        status: order.status,
        amount: order.amount,
        customerName: order.Customer.name,
        productName: order.Product.name,
        createdAt: order.createdAt
      }))

      return responseHandler.success(res, formattedOrders, '成功獲取用戶訂單')
    } catch (error) {
      console.error('獲取用戶訂單失敗:', error)
      return responseHandler.error(res, '獲取用戶訂單失敗', 500, error.message)
    }
  },

  // 獲取用戶詳情
  async getUserById(req, res) {
    try {
      const userId = parseInt(req.params.id)
      if (isNaN(userId)) {
        return responseHandler.badRequest(res, '無效的用戶 ID')
      }

      const user = await Customer.findByPk(userId, {
        include: [
          {
            model: Group,
            attributes: ['id', 'name']
          }
        ]
      })

      if (!user) {
        return responseHandler.notFound(res, '用戶不存在')
      }

      // 獲取用戶的訂單統計
      const orderStats = await Order.findAll({
        where: { CustomerId: userId },
        attributes: [
          [sequelize.fn('COUNT', sequelize.col('id')), 'totalOrders'],
          [sequelize.fn('SUM', sequelize.col('amount')), 'totalAmount']
        ]
      })

      // 獲取用戶的已完成訂單統計（用於計算總花費）
      const completedOrderStats = await Order.findAll({
        where: { 
          CustomerId: userId,
          status: 'completed'
        },
        attributes: [
          [sequelize.fn('SUM', sequelize.col('amount')), 'totalSpent']
        ]
      })

      // 獲取用戶的訂單列表
      const orders = await Order.findAll({
        where: { CustomerId: userId },
        include: [
          {
            model: Product,
            attributes: ['productId', 'name'],
            include: [
              {
                model: ProductDetail,
                attributes: ['providerName', 'providerLogo', 'retailPrice', 'currencyCode']
              }
            ]
          },
          {
            model: Card,
            as: 'Card',
            attributes: ['iccid']
          }
        ],
        order: [['createdAt', 'DESC']]
      })

      const formattedOrders = orders.map(order => ({
        id: order.id,
        orderNumber: order.orderNumber,
        createdAt: order.createdAt,
        status: order.status,
        amount: order.amount,
        productId: order.Product?.productId || '',
        Product: order.Product ? {
          name: order.Product.name,
          productId: order.Product.productId
        } : null,
        Card: order.Card ? {
          iccid: order.Card.iccid
        } : null
      }))

      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        group: user.Group.name,
        orderCount: parseInt(orderStats[0]?.getDataValue('totalOrders') || 0),
        totalSpent: parseFloat(completedOrderStats[0]?.getDataValue('totalSpent') || 0),
        note: user.note,
        orders: formattedOrders
      }

      return responseHandler.success(res, userData, '成功獲取用戶詳情')
    } catch (error) {
      console.error('獲取用戶詳情失敗:', error)
      return responseHandler.error(res, '獲取用戶詳情失敗', 500, error.message)
    }
  },

  // 獲取訂單 ICCID
  async getOrderICCID(req, res) {
    try {
      const { orderId } = req.params;
      const { Card } = require('../models');
      
      const order = await Order.findByPk(parseInt(orderId), {
        include: [{
          model: Card,
          as: 'Card',
          attributes: ['iccid']
        }]
      });

      if (!order) {
        return responseHandler.notFound(res, '訂單不存在');
      }

      return responseHandler.success(res, { 
        iccid: order.Card?.iccid || null 
      }, '成功獲取 ICCID');
    } catch (error) {
      console.error('查詢 ICCID 失敗:', error);
      return responseHandler.error(res, '查詢 ICCID 失敗', 500, error.message);
    }
  }
}

module.exports = userController 