require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

module.exports = {
    apiKey: process.env.API_KEY,
    merchantId: process.env.MERCHANT_ID,
    baseurl: process.env.BASEURL || 'https://api.mobimatter.com/mobimatter/api',
    apiVersion: process.env.API_VERSION || 'v2',
    storeName: process.env.STORE_NAME || '',
}; 