const { Billing, Customer } = require('../models');
const Big = require('big.js');
const responseHandler = require('../utils/responseHandler');

const billingController = {
  getCenter: async (req, res) => {
    try {
      // 支援查詢條件
      const { page = 1, pageSize = 20, customerId, type, dateFrom, dateTo } = req.query;
      const offset = (page - 1) * pageSize;
      const where = {};

      if (customerId) where.customerId = customerId;
      if (type) where.type = type;
      if (dateFrom || dateTo) {
        where.date = {};
        if (dateFrom) where.date['$gte'] = new Date(dateFrom);
        if (dateTo) where.date['$lte'] = new Date(dateTo);
      }

      const { count, rows } = await Billing.findAndCountAll({
        where,
        include: [{ model: Customer, as: 'Customer', attributes: ['id', 'name', 'email'] }],
        order: [['date', 'DESC']],
        offset,
        limit: parseInt(pageSize)
      });

      // 彙整統計（全站或篩選後）
      const all = await Billing.findAll({ where });
      
      // 使用 Big.js 進行精確計算
      const currentBalance = all.reduce((sum, item) => {
        return sum.plus(new Big(item.getDataValue('amount')));
      }, new Big(0)).toString();

      // 當月統計
      const now = new Date();
      const thisMonth = now.getMonth();
      const thisYear = now.getFullYear();
      let buyCount = 0, depositCount = 0;
      let totalSpent = new Big(0);
      
      all.forEach(item => {
        const d = new Date(item.date);
        if (d.getFullYear() === thisYear && d.getMonth() === thisMonth) {
          if (item.type === 'purchase') buyCount++;
          if (item.type === 'deposit') depositCount++;
          if (item.amount < 0) {
            totalSpent = totalSpent.plus(new Big(item.getDataValue('amount')).abs());
          }
        }
      });

      const responseData = {
        items: rows,
        currentBalance,
        monthlyStats: { 
          buyCount, 
          depositCount, 
          totalSpent: totalSpent.toString() 
        },
        pagination: {
          total: count,
          page: parseInt(page),
          pageSize: parseInt(pageSize)
        }
      };

      return responseHandler.success(res, responseData, '成功獲取帳務中心資訊');
    } catch (error) {
      return responseHandler.error(res, '獲取帳務中心資訊失敗', 500, error.message);
    }
  },

  addBalance: async (req, res) => {
    try {
      const { amount, note } = req.body;

      // 參數驗證
      if (!amount) {
        return responseHandler.badRequest(res, '缺少必要參數：amount');
      }

      // 驗證金額是否為正數
      const balanceAmount = new Big(amount);
      if (balanceAmount.lte(0)) {
        return responseHandler.badRequest(res, '儲值金額必須大於 0');
      }

      // 創建系統儲值記錄
      const billing = await Billing.create({
        amount: balanceAmount.toString(),
        type: 'deposit',
        description: note || '系統儲值',
        date: new Date()
      });

      // 獲取系統總餘額
      const allBillings = await Billing.findAll();
      const currentBalance = allBillings.reduce((sum, item) => {
        return sum.plus(new Big(item.getDataValue('amount')));
      }, new Big(0)).toString();

      const responseData = {
        billing,
        currentBalance
      };

      return responseHandler.success(res, responseData, '系統儲值成功');
    } catch (error) {
      console.error('系統儲值失敗:', error);
      return responseHandler.error(res, '系統儲值失敗', 500, error.message);
    }
  }
};

module.exports = billingController; 