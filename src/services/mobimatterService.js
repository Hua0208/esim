const axios = require('axios');
const config = require('../config/config');

class MobimatterService {
    constructor() {
        this.client = axios.create({
            baseURL: `${config.baseurl}/${config.apiVersion}`,
            headers: {
                'Accept': 'text/plain',
                'merchantId': config.merchantId,
                'api-key': config.apiKey
            }
        });
    }

    // 購買 eSIM 卡
    async purchaseESim({ productId, productCategory, addOnOrderIdentifier, label, customerId }) {
        try {
            const response = await axios.post(
                `${config.baseurl}/${config.apiVersion}/order`,
                {
                    productId,
                    productCategory,
                    addOnOrderIdentifier,
                    label,
                    customerId
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'text/plain',
                        'merchantId': config.merchantId,
                        'api-key': config.apiKey
                    },
                    maxBodyLength: Infinity
                }
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // 儲值 eSIM 卡
    async topUpESim({ productId, addOnOrderIdentifier }) {
        try {
            const response = await this.client.post('/order', {
                productId,
                productCategory: 'esim_addon',
                addOnOrderIdentifier
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // 根據 ICCID 查詢訂單
    async getOrderByICCID(iccid) {
        try {
            const response = await this.client.get(`/order?iccid=${iccid}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // 查詢 provider info by orderId
    async getProviderInfo(orderId) {
        try {
            const response = await this.client.get(`/provider/info/${orderId}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // 完成訂單
    async completeOrder(orderId, notes = '') {
        try {
            const response = await axios.put(
                `${config.baseurl}/${config.apiVersion}/order/complete`,
                {
                    orderId,
                    notes
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'text/plain',
                        'merchantId': config.merchantId,
                        'api-key': config.apiKey
                    },
                    maxBodyLength: Infinity
                }
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // 取得產品可用網路
    async getProductNetworks(productId) {
        try {
            const response = await axios.get(
                `${config.baseurl}/${config.apiVersion}/products/${productId}/networks`,
                {
                    headers: {
                        'Accept': 'text/plain',
                        'merchantId': config.merchantId,
                        'api-key': config.apiKey
                    },
                    maxBodyLength: Infinity
                }
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // 取得產品詳細資訊
    async getProductDetails(productId) {
        try {
            const response = await axios.get(
                `${config.baseurl}/${config.apiVersion}/products?productId=${productId}`,
                {
                    headers: {
                        'Accept': 'text/plain',
                        'merchantId': config.merchantId,
                        'api-key': config.apiKey
                    }
                }
            );
            return response.data.result[0];
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // 錯誤處理
    handleError(error) {
        if (error.response) {
            return {
                status: error.response.status,
                message: error.response.data.message || 'API 請求失敗',
                data: error.response.data
            };
        }
        return {
            status: 500,
            message: '系統錯誤',
            error: error.message
        };
    }
}

module.exports = new MobimatterService(); 