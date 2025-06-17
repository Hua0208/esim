const { User, Group, Order, Product, Card } = require('../models')
const { Sequelize } = require('sequelize')
const sequelize = require('../db')
const responseHandler = require('../utils/responseHandler')
const Big = require('big.js')

const userController = {
  // 獲取所有用戶
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll({
        include: [
          {
            model: Group,
            attributes: ['name']
          },
          {
            model: Order,
            attributes: []
          }
        ],
        attributes: {
          include: [
            [Sequelize.fn('COUNT', Sequelize.col('Orders.id')), 'orderCount']
          ]
        },
        group: ['User.id', 'Group.id', 'Group.name']
      })

      const formattedUsers = users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        group: user.Group.name,
        orderCount: parseInt(user.getDataValue('orderCount')),
        note: user.note
      }))

      return responseHandler.success(res, formattedUsers, '成功獲取用戶列表')
    } catch (error) {
      console.error('獲取用戶列表失敗:', error)
      return responseHandler.error(res, '獲取用戶列表失敗', 500, error.message)
    }
  },

  // 創建新用戶
  async createUser(req, res) {
    try {
      const { name, email, groupId, note } = req.body
      const user = await User.create({
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
      const user = await User.findByPk(id)
      
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
      const user = await User.findByPk(id)
      
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
        where: { UserId: id },
        include: [
          {
            model: User,
            attributes: ['name']
          },
          {
            model: Product,
            attributes: ['name'],
            required: false
          }
        ]
      })

      const formattedOrders = orders.map(order => ({
        id: order.id,
        createdAt: order.createdAt,
        status: order.status,
        amount: order.amount,
        productName: order.Product ? order.Product.name : null,
        customerName: order.User.name
      }))

      return responseHandler.success(res, formattedOrders, '成功獲取用戶訂單')
    } catch (error) {
      console.error('獲取用戶訂單失敗:', error)
      return responseHandler.error(res, '獲取用戶訂單失敗', 500, error.message)
    }
  },

  // 獲取單個用戶詳情
  async getUserById(req, res) {
    try {
      const userId = parseInt(req.params.id)
      if (isNaN(userId)) {
        return responseHandler.badRequest(res, '無效的用戶 ID')
      }

      const user = await User.findByPk(userId, {
        include: [{
          model: Group,
          attributes: ['name']
        }]
      })

      if (!user) {
        return responseHandler.notFound(res, '用戶不存在')
      }

      // 獲取用戶的所有訂單（用於計算總金額）
      const allOrders = await Order.findAll({
        where: { userId },
        attributes: ['id', 'amount', 'status']
      })

      // 計算累積消費（包含所有訂單）
      const totalSpent = allOrders.reduce((sum, order) => {
        if (order.status === 'completed') {
          return sum.plus(new Big(order.amount))
        }
        return sum
      }, new Big(0))

      // 獲取用戶的購卡訂單列表（只顯示 esim_realtime）
      const orders = await Order.findAll({
        where: { 
          userId,
          type: 'esim_realtime'  // 只顯示購卡訂單
        },
        attributes: { exclude: ['orderNumber'] },
        include: [
          {
            model: Product,
            attributes: ['name', 'productId']
          },
          {
            model: Card,
            as: 'Card',
            attributes: ['iccid']
          }
        ],
        order: [['createdAt', 'DESC']]
      })

      const userData = {
        ...user.toJSON(),
        orders,
        totalSpent: totalSpent.toString()
      }

      return responseHandler.success(res, userData, '成功獲取用戶詳情')
    } catch (error) {
      console.error('獲取用戶詳情失敗:', error)
      return responseHandler.error(res, '獲取用戶詳情失敗', 500, error.message)
    }
  }
}

module.exports = userController 