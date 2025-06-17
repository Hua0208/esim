const { Product, ProductDetail } = require('../models');
const mobimatterService = require('../services/mobimatterService');
const responseHandler = require('../utils/responseHandler');
const { downloadAndSaveImage } = require('../utils/imageUtils');

const convertProductDetailsToObject = (details) => {
  const result = {};
  details.forEach(detail => {
    if ([
      'PLAN_DATA_LIMIT',
      'PLAN_VALIDITY',
      'PLAN_DATA_UNIT',
      'HOTSPOT'
    ].includes(detail.name)) {
      result[detail.name] = detail.name === 'PLAN_DATA_UNIT' ? detail.value : Number(detail.value);
    }
  });
  return result;
};

const productController = {
  getAllProducts: async (req, res) => {
    try {
      const { productCategory } = req.query;
      const where = {};
      if (productCategory) where.productCategory = productCategory;
      const products = await Product.findAll({
        where,
        include: [{ model: ProductDetail, required: false }]
      });
      const productsWithDetails = products.map(product => {
        const productJson = product.toJSON();
        const details = productJson.ProductDetail || {};
        delete productJson.ProductDetail;
        return {
          ...productJson,
          Details: {
            providerName: details.providerName,
            providerLogo: details.providerLogo,
            retailPrice: details.retailPrice,
            currencyCode: details.currencyCode,
            regions: details.regions || [],
            countries: details.countries || [],
            productDetails: {
              PLAN_DATA_LIMIT: details.planDataLimit,
              PLAN_VALIDITY: details.planValidity,
              PLAN_DATA_UNIT: details.planDataUnit,
              HOTSPOT: details.hotspot
            }
          }
        };
      });
      return responseHandler.success(res, productsWithDetails, '成功取得產品列表');
    } catch (error) {
      console.error('Error fetching products:', error);
      return responseHandler.error(res, '獲取產品列表失敗', 500, error.message);
    }
  },

  createProduct: async (req, res) => {
    try {
      const { productId, name, enabled } = req.body;
      let type = req.body.type;
      if (!type) type = 'esim_realtime';
      // 檢查 name 是否為空，若為空則從上游 API 取得產品名稱
      let productName = name;
      if (!productName) {
        try {
          const mobimatterDetails = await mobimatterService.getProductDetails(productId);
          if (!mobimatterDetails || !mobimatterDetails.productDetails) {
            console.error('無法取得產品詳情，上游 API 回應:', mobimatterDetails);
            return responseHandler.error(res, '無法取得產品詳情，請確認上游 API 回應', 400);
          }
          const planTitle = mobimatterDetails.productDetails.find(detail => detail.name === 'PLAN_TITLE');
          productName = planTitle ? planTitle.value : null;
        } catch (error) {
          console.error('從上游 API 取得產品詳情時發生錯誤:', error);
          return responseHandler.error(res, '從上游 API 取得產品詳情時發生錯誤', 500);
        }
      }
      if (!productName) {
        return responseHandler.error(res, '產品名稱缺失，請確認資料或上游 API 回應', 400);
      }
      // 檢查產品是否已存在
      const existingProduct = await Product.findOne({
        where: { productId },
        include: [{ model: ProductDetail, required: false }]
      });
      if (existingProduct) {
        const mobimatterDetails = await mobimatterService.getProductDetails(productId);
        if (!mobimatterDetails || !mobimatterDetails.productDetails) {
          console.error('無法取得產品詳情，上游 API 回應:', mobimatterDetails);
          return responseHandler.error(res, '無法取得產品詳情，請確認上游 API 回應', 400);
        }
        const productDetails = convertProductDetailsToObject(mobimatterDetails.productDetails);
        
        // 下載並儲存 providerLogo
        const savedLogoPath = await downloadAndSaveImage(mobimatterDetails.providerLogo);
        
        await existingProduct.update({ name: productName, type, enabled, productCategory: mobimatterDetails.productCategory });
        const [details] = await ProductDetail.findOrCreate({
          where: { productId: existingProduct.id },
          defaults: {
            productId: existingProduct.id,
            providerName: mobimatterDetails.providerName,
            providerLogo: savedLogoPath,
            retailPrice: mobimatterDetails.retailPrice,
            currencyCode: mobimatterDetails.currencyCode,
            regions: mobimatterDetails.regions,
            countries: mobimatterDetails.countries,
            planDataLimit: productDetails.PLAN_DATA_LIMIT,
            planValidity: productDetails.PLAN_VALIDITY,
            planDataUnit: productDetails.PLAN_DATA_UNIT,
            hotspot: productDetails.HOTSPOT
          }
        });
        if (!details.isNewRecord) {
          await details.update({
            providerName: mobimatterDetails.providerName,
            providerLogo: savedLogoPath,
            retailPrice: mobimatterDetails.retailPrice,
            currencyCode: mobimatterDetails.currencyCode,
            regions: mobimatterDetails.regions,
            countries: mobimatterDetails.countries,
            planDataLimit: productDetails.PLAN_DATA_LIMIT,
            planValidity: productDetails.PLAN_VALIDITY,
            planDataUnit: productDetails.PLAN_DATA_UNIT,
            hotspot: productDetails.HOTSPOT
          });
        }
        const fullProduct = await Product.findByPk(existingProduct.id, { include: [{ model: ProductDetail, required: false }] });
        const productJson = fullProduct.toJSON();
        const detailsJson = productJson.ProductDetail || {};
        delete productJson.ProductDetail;
        const response = {
          ...productJson,
          productCategory: mobimatterDetails.productCategory,
          Details: {
            providerName: detailsJson.providerName,
            providerLogo: detailsJson.providerLogo,
            retailPrice: detailsJson.retailPrice,
            currencyCode: detailsJson.currencyCode,
            regions: detailsJson.regions || [],
            countries: detailsJson.countries || [],
            productDetails: {
              PLAN_DATA_LIMIT: detailsJson.planDataLimit,
              PLAN_VALIDITY: detailsJson.planValidity,
              PLAN_DATA_UNIT: detailsJson.planDataUnit,
              HOTSPOT: detailsJson.hotspot
            }
          }
        };
        return responseHandler.success(res, response, '產品已存在，已更新');
      }
      // 新增產品
      const mobimatterDetails = await mobimatterService.getProductDetails(productId);
      if (!mobimatterDetails || !mobimatterDetails.productDetails) {
        console.error('無法取得產品詳情，上游 API 回應:', mobimatterDetails);
        return responseHandler.error(res, '無法取得產品詳情，請確認上游 API 回應', 400);
      }
      const productDetails = convertProductDetailsToObject(mobimatterDetails.productDetails);
      
      // 下載並儲存 providerLogo
      const savedLogoPath = await downloadAndSaveImage(mobimatterDetails.providerLogo);
      
      const product = await Product.create({
        productId,
        name: productName,
        type,
        enabled,
        productCategory: mobimatterDetails.productCategory
      });
      const productDetail = await ProductDetail.create({
        productId: product.id,
        providerName: mobimatterDetails.providerName,
        providerLogo: savedLogoPath,
        retailPrice: mobimatterDetails.retailPrice,
        currencyCode: mobimatterDetails.currencyCode,
        regions: mobimatterDetails.regions,
        countries: mobimatterDetails.countries,
        planDataLimit: productDetails.PLAN_DATA_LIMIT,
        planValidity: productDetails.PLAN_VALIDITY,
        planDataUnit: productDetails.PLAN_DATA_UNIT,
        hotspot: productDetails.HOTSPOT
      });
      const fullProduct = await Product.findByPk(product.id, { include: [{ model: ProductDetail, required: false }] });
      const productJson = fullProduct.toJSON();
      const detailsJson = productJson.ProductDetail || {};
      delete productJson.ProductDetail;
      const response = {
        ...productJson,
        productCategory: mobimatterDetails.productCategory,
        Details: {
          providerName: detailsJson.providerName,
          providerLogo: detailsJson.providerLogo,
          retailPrice: detailsJson.retailPrice,
          currencyCode: detailsJson.currencyCode,
          regions: detailsJson.regions || [],
          countries: detailsJson.countries || [],
          productDetails: {
            PLAN_DATA_LIMIT: detailsJson.planDataLimit,
            PLAN_VALIDITY: detailsJson.planValidity,
            PLAN_DATA_UNIT: detailsJson.planDataUnit,
            HOTSPOT: detailsJson.hotspot
          }
        }
      };
      return responseHandler.success(res, response, '成功新增產品', 201);
    } catch (error) {
      console.error('Error creating/updating product:', error);
      return responseHandler.error(res, '新增/更新產品失敗', 500, error.message);
    }
  },

  updateProductDetails: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (!product) {
        return responseHandler.notFound(res, '找不到產品');
      }
      const mobimatterDetails = await mobimatterService.getProductDetails(product.productId);
      const productDetails = convertProductDetailsToObject(mobimatterDetails.productDetails);
      
      // 下載並儲存 providerLogo
      const savedLogoPath = await downloadAndSaveImage(mobimatterDetails.providerLogo);
      
      const [details] = await ProductDetail.findOrCreate({
        where: { productId: product.id },
        defaults: {
          productId: product.id,
          providerName: mobimatterDetails.providerName,
          providerLogo: savedLogoPath,
          retailPrice: mobimatterDetails.retailPrice,
          currencyCode: mobimatterDetails.currencyCode,
          regions: mobimatterDetails.regions,
          countries: mobimatterDetails.countries,
          planDataLimit: productDetails.PLAN_DATA_LIMIT,
          planValidity: productDetails.PLAN_VALIDITY,
          planDataUnit: productDetails.PLAN_DATA_UNIT,
          hotspot: productDetails.HOTSPOT
        }
      });
      if (!details.isNewRecord) {
        await details.update({
          providerName: mobimatterDetails.providerName,
          providerLogo: savedLogoPath,
          retailPrice: mobimatterDetails.retailPrice,
          currencyCode: mobimatterDetails.currencyCode,
          regions: mobimatterDetails.regions,
          countries: mobimatterDetails.countries,
          planDataLimit: productDetails.PLAN_DATA_LIMIT,
          planValidity: productDetails.PLAN_VALIDITY,
          planDataUnit: productDetails.PLAN_DATA_UNIT,
          hotspot: productDetails.HOTSPOT
        });
      }
      const fullProduct = await Product.findByPk(product.id, { include: [{ model: ProductDetail, required: false }] });
      const productJson = fullProduct.toJSON();
      const detailsJson = productJson.ProductDetail || {};
      delete productJson.ProductDetail;
      const response = {
        ...productJson,
        Details: {
          providerName: detailsJson.providerName,
          providerLogo: savedLogoPath,
          retailPrice: detailsJson.retailPrice,
          currencyCode: detailsJson.currencyCode,
          regions: detailsJson.regions || [],
          countries: detailsJson.countries || [],
          productDetails: {
            PLAN_DATA_LIMIT: detailsJson.planDataLimit,
            PLAN_VALIDITY: detailsJson.planValidity,
            PLAN_DATA_UNIT: detailsJson.planDataUnit,
            HOTSPOT: detailsJson.hotspot
          }
        }
      };
      return responseHandler.success(res, response, '成功更新產品詳情');
    } catch (error) {
      console.error('Error updating product details:', error);
      return responseHandler.error(res, '更新產品詳情失敗', 500, error.message);
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const deleted = await Product.destroy({ where: { id: req.params.id } });
      if (deleted) {
        return responseHandler.success(res, null, '成功刪除產品');
      } else {
        return responseHandler.notFound(res, '找不到產品');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      return responseHandler.error(res, '刪除產品失敗', 500, error.message);
    }
  }
};

module.exports = productController; 