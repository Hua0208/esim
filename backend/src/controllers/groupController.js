const { Group, Customer } = require('../models')
const responseHandler = require('../utils/responseHandler')

const groupController = {
  // 獲取所有群組
  async getAllGroups(req, res) {
    try {
      const groups = await Group.findAll({
        include: [{
          model: Customer,
          attributes: ['id']
        }]
      })

      const groupsWithMemberCount = groups.map(group => ({
        id: group.id,
        name: group.name,
        description: group.description,
        memberCount: group.Customers.length
      }))

      return responseHandler.success(res, groupsWithMemberCount, '成功獲取群組列表')
    } catch (error) {
      console.error('獲取群組列表失敗:', error)
      return responseHandler.error(res, '獲取群組列表失敗', 500, error.message)
    }
  },

  // 創建新群組
  async createGroup(req, res) {
    try {
      const { name, description } = req.body
      const group = await Group.create({ name, description })
      return responseHandler.success(res, group, '群組創建成功', 201)
    } catch (error) {
      console.error('創建群組失敗:', error)
      return responseHandler.error(res, '創建群組失敗', 500, error.message)
    }
  },

  // 更新群組
  async updateGroup(req, res) {
    try {
      const { id } = req.params
      const { name, description } = req.body
      const group = await Group.findByPk(id)
      
      if (!group) {
        return responseHandler.notFound(res, '群組不存在')
      }

      await group.update({ name, description })
      return responseHandler.success(res, group, '群組更新成功')
    } catch (error) {
      console.error('更新群組失敗:', error)
      return responseHandler.error(res, '更新群組失敗', 500, error.message)
    }
  },

  // 刪除群組
  // async deleteGroup(req, res) {
  //   try {
  //     const { id } = req.params
  //     const group = await Group.findByPk(id)
  //     if (!group) {
  //       return responseHandler.notFound(res, '群組不存在')
  //     }
  //     await group.destroy()
  //     return responseHandler.success(res, null, '群組刪除成功', 204)
  //   } catch (error) {
  //     console.error('刪除群組失敗:', error)
  // }
}

module.exports = groupController 