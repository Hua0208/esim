const mobimatterService = require('../services/mobimatterService');
const { Card, Order, Billing, Product, ProductDetail } = require('../models');
const responseHandler = require('../utils/responseHandler');
const Big = require('big.js');

const esimController = {
    // 購買 eSIM（完整流程）
    purchaseESim: async (req, res) => {
        try {
            const { productId, customerId } = req.body;
            // 參數驗證
            if (!productId || !customerId) {
                return responseHandler.badRequest(res, '缺少必要參數：productId 或 customerId');
            }

            // 獲取產品價格
            const product = await Product.findOne({
                where: { productId },
                include: [{ model: ProductDetail, required: false }]
            });

            if (!product) {
                return responseHandler.notFound(res, '找不到指定產品');
            }

            const amount = product?.ProductDetail?.retailPrice || 0;
            if (amount <= 0) {
                return responseHandler.badRequest(res, '產品價格無效');
            }

            // 檢查系統餘額（包含所有記錄）
            const allBillings = await Billing.findAll();
            
            // 使用 Big.js 進行精確計算
            const currentBalance = allBillings.reduce((sum, item) => {
                return sum.plus(new Big(item.getDataValue('amount')));
            }, new Big(0));

            console.log('當前餘額:', currentBalance.toString(), '訂單金額:', amount);

            // 如果餘額不足，返回錯誤
            if (currentBalance.lt(new Big(amount))) {
                return responseHandler.badRequest(res, '餘額不足，請先儲值');
            }

            // 呼叫 mobimatterService
            const result = await mobimatterService.purchaseESim({
                productId,
                productCategory: 'esim_realtime',
                customerId
            });

            // 新增本地訂單紀錄
            if (result && result.result && result.result.orderId && customerId) {
                try {
                    const order = await Order.create({
                        orderNumber: result.result.orderId,
                        type: 'esim_realtime',
                        status: 'pending',
                        amount: amount,
                        productId: productId,
                        UserId: customerId
                    });
                    // 修改回傳結果，使用資料庫的 id
                    result.result.orderId = order.id;
                } catch (error) {
                    console.error('訂單創建失敗:', error);
                }
            }
            return responseHandler.success(res, result, 'eSIM 購買成功');
        } catch (error) {
            return responseHandler.error(res, error.message || 'eSIM 購買失敗', error.status || 500, error);
        }
    },

    // 儲值 eSIM
    topUpESim: async (req, res) => {
        try {
            const { productId, orderId } = req.body;
            
            // 驗證必要參數
            if (!productId || !orderId) {
                return responseHandler.badRequest(res, '缺少必要參數：productId 或 orderId');
            }

            // 從 SQLite 查詢原始 order number
            const order = await Order.findOne({
                where: { id: orderId }
            });

            if (!order) {
                return responseHandler.notFound(res, '找不到訂單');
            }

            // 獲取加值產品價格
            const product = await Product.findOne({
                where: { productId },
                include: [{ model: ProductDetail, required: false }]
            });

            if (!product) {
                return responseHandler.notFound(res, 'topup product not found');
            }

            const amount = product?.ProductDetail?.retailPrice || 0;
            if (amount <= 0) {
                return responseHandler.badRequest(res, 'topup product price is invalid');
            }

            const result = await mobimatterService.topUpESim({
                productId,
                addOnOrderIdentifier: order.orderNumber
            });

            // 新增儲值訂單紀錄
            if (result && result.result && result.result.orderId) {
                try {
                    const topupOrder = await Order.create({
                        orderNumber: result.result.orderId,
                        type: 'esim_addon',
                        status: 'pending',
                        amount: amount,
                        productId: productId,
                        UserId: order.UserId
                    });
                } catch (error) {
                    console.error('儲值訂單創建失敗:', error);
                }
            }

            // 寫入 Billings（總帳）
            if (order && order.UserId) {
                await Billing.create({
                    userId: order.UserId,
                    date: new Date(),
                    type: 'topup',
                    amount: -amount,
                    description: `Topup Order ID ${order.id}`,
                    status: '已完成',
                    reference: order.id
                });
            }

            return responseHandler.success(res, result, 'eSIM 儲值成功');
        } catch (error) {
            return responseHandler.error(res, error.message || 'eSIM 儲值失敗', error.status || 500, error);
        }
    },

    // 根據 ICCID 查詢訂單
    getOrderByICCID: async (req, res) => {
        try {
            const { iccid } = req.query;
            if (!iccid) {
                return responseHandler.badRequest(res, 'ICCID 是必須的');
            }

            // 查訂單
            const orderResult = await mobimatterService.getOrderByICCID(iccid);

            // 取出 orderId 並查 provider info
            const orderId = orderResult?.result?.orderId || orderResult?.orderId;
            let providerInfo = null;
            if (orderId) {
                try {
                    providerInfo = await mobimatterService.getProviderInfo(orderId);
                } catch (e) {
                    providerInfo = null;
                }
            }

            // 格式化回應
            const formattedResponse = {
                order: {
                    orderState: orderResult?.result?.orderState || orderResult?.orderState,
                    created: orderResult?.result?.created || orderResult?.created,
                    updated: orderResult?.result?.updated || orderResult?.updated
                },
                product: {
                    productId: orderResult?.result?.orderLineItem?.productId,
                    productCategory: orderResult?.result?.orderLineItem?.productCategory,
                    productFamilyName: orderResult?.result?.orderLineItem?.productFamilyName,
                    productFamilyId: orderResult?.result?.orderLineItem?.productFamilyId,
                    title: orderResult?.result?.orderLineItem?.title,
                    provider: orderResult?.result?.orderLineItem?.provider,
                    providerName: orderResult?.result?.orderLineItem?.providerName,
                    retailPrice: orderResult?.result?.orderLineItem?.retailPrice
                },
                esim: {}
            };

            // 添加 lineItemDetails 中的值到 esim 物件
            const lineItemDetails = orderResult?.result?.orderLineItem?.lineItemDetails || [];
            lineItemDetails.forEach(item => {
                if (item.name && item.value) {
                    formattedResponse.esim[item.name] = item.value;
                }
            });

            // 添加 providerInfo
            if (providerInfo) {
                formattedResponse.providerInfo = providerInfo;
            }

            return responseHandler.success(res, formattedResponse, '成功獲取訂單資訊');
        } catch (error) {
            return responseHandler.error(res, error.message || '獲取訂單資訊失敗', error.status || 500, error);
        }
    },

    // 取得供應商資訊
    getProviderInfo: async (req, res) => {
        try {
            const { orderId } = req.params;
            if (!orderId) {
                return responseHandler.badRequest(res, 'orderId 是必須的');
            }
            const result = await mobimatterService.getProviderInfo(orderId);
            return responseHandler.success(res, result, '成功獲取供應商資訊');
        } catch (error) {
            return responseHandler.error(res, error.message || '獲取供應商資訊失敗', error.status || 500, error);
        }
    },

    // 完成訂單
    completeOrder: async (req, res) => {
        try {
            const { orderId, notes } = req.body;
            if (!orderId) {
                return responseHandler.badRequest(res, 'orderId 是必須的');
            }
            let result;
            try {
                result = await mobimatterService.completeOrder(orderId, notes);

                // mobimatterService 完成後，更新本地 orders 狀態為 completed
                await Order.update(
                    { status: 'completed' },
                    { where: { orderNumber: orderId } }
                );

                // 取得本地訂單資訊
                const order = await Order.findOne({ where: { orderNumber: orderId } });
                // 取得 userId
                const userId = order ? order.UserId : null;
                // 取得 eSIM 資訊（解析 lineItemDetails）
                const esimData = result.result || {};
                const lineItem = esimData.orderLineItem || {};
                const details = Array.isArray(lineItem.lineItemDetails) ? lineItem.lineItemDetails : [];
                const getDetail = (name) => {
                  const found = details.find(d => d.name === name);
                  return found ? found.value : null;
                };
                const iccid = getDetail('ICCID');
                const qrcode = getDetail('QR_CODE');
                const expiredAt = null; // 若未來有有效期欄位可補上
                if (userId && iccid) {
                  await Card.create({
                    userId,
                    orderId: order ? order.id : null,
                    iccid,
                    purchasedAt: order ? order.createdAt : new Date(),
                    expiredAt,
                    qrcode,
                    esimInfo: lineItem
                  });
                }

                // 寫入 Billings（總帳）
                if (order && userId) {
                  await Billing.create({
                    userId,
                    date: new Date(),
                    type: 'purchase',
                    amount: -order.amount,
                    description: `Order ID ${order.id}`,
                    status: '已完成',
                    reference: order.id
                  });
                }

                return responseHandler.success(res, result, '訂單完成成功');
            } catch (error) {
                // 如果上游回應 400，將訂單狀態改為 cancelled
                if (error.status === 400) {
                    await Order.update(
                        { status: 'cancelled' },
                        { where: { orderNumber: orderId } }
                    );
                }
                throw error;
            }
        } catch (error) {
            return responseHandler.error(res, error.message || '完成訂單失敗', error.status || 500, error);
        }
    },

    // 取得產品可用網路
    getProductNetworks: async (req, res) => {
        try {
            const { productId } = req.params;
            if (!productId) {
                return res.status(400).json({ status: 400, message: 'productId 是必須的' });
            }
            const result = await mobimatterService.getProductNetworks(productId);
            res.json(result);
        } catch (error) {
            const msg = error?.message || error?.data?.message || '';
            if (
                msg.includes('Network list was not found for product') ||
                (error?.data?.message && error.data.message.includes('Network list was not found for product'))
            ) {
                return res.status(400).json({ status: 400, message: '該卡不支援查詢' });
            }
            res.status(error.status || 500).json(error);
        }
    }
};

module.exports = esimController; 