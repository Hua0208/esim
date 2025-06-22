// 載入環境變數
require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });

const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { Product, ProductDetail } = require('./src/models');
const mobimatterService = require('./src/services/mobimatterService');
const { downloadAndSaveImage } = require('./src/utils/imageUtils');
const sequelize = require('./src/db');

// 創建 readline 介面
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 封裝 readline 為 Promise
function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

// 轉換產品詳細資訊為物件
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

// 驗證 product ID 格式
function validateProductId(productId) {
  if (!productId || productId.trim() === '') {
    return 'Product ID 不能為空';
  }
  if (productId.length > 100) {
    return 'Product ID 長度不能超過 100 個字符';
  }
  return null;
}

// 顯示產品資訊
function displayProductInfo(product, details) {
  console.log(`\n📦 產品資訊:`);
  console.log(`   ID: ${product.id}`);
  console.log(`   Product ID: ${product.productId}`);
  console.log(`   名稱: ${product.name}`);
  console.log(`   類型: ${product.productCategory || 'esim_realtime'}`);
  console.log(`   狀態: ${product.enabled ? '啟用' : '停用'}`);
  
  if (details) {
    console.log(`\n💰 價格資訊:`);
    console.log(`   供應商: ${details.providerName}`);
    console.log(`   價格: ${details.retailPrice} ${details.currencyCode}`);
    console.log(`   地區: ${(details.regions || []).join(', ')}`);
    console.log(`   國家: ${(details.countries || []).join(', ')}`);
    
    if (details.planDataLimit) {
      console.log(`\n📊 方案資訊:`);
      console.log(`   數據限制: ${details.planDataLimit} ${details.planDataUnit}`);
      console.log(`   有效期: ${details.planValidity} 天`);
      console.log(`   熱點: ${details.hotspot ? '支援' : '不支援'}`);
    }
  }
  console.log('─'.repeat(50));
}

// 驗證必要的環境變數
function validateEnvironmentVariables() {
  const requiredVars = ['API_KEY', 'MERCHANT_ID'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ 缺少必要的環境變數:');
    missingVars.forEach(varName => {
      console.error(`   - ${varName}`);
    });
    console.error('\n請檢查 .env 檔案是否包含這些變數');
    process.exit(1);
  }
  
  console.log('✅ 環境變數驗證通過');
}

// 創建或更新產品
async function createOrUpdateProduct(productId, enabled = true) {
  try {
    // 檢查產品是否已存在
    const existingProduct = await Product.findOne({
      where: { productId },
      include: [{ model: ProductDetail, required: false }]
    });

    // 從 Mobimatter API 獲取產品詳細資訊
    console.log(`🔄 正在獲取產品 ${productId} 的詳細資訊...`);
    const mobimatterDetails = await mobimatterService.getProductDetails(productId);
    
    if (!mobimatterDetails || !mobimatterDetails.productDetails) {
      throw new Error(`無法獲取產品 ${productId} 的詳細資訊`);
    }

    const productDetails = convertProductDetailsToObject(mobimatterDetails.productDetails);
    
    // 獲取產品名稱
    const planTitle = mobimatterDetails.productDetails.find(detail => detail.name === 'PLAN_TITLE');
    const productName = planTitle ? planTitle.value : `產品 ${productId}`;

    // 下載並儲存 providerLogo
    let savedLogoPath = null;
    if (mobimatterDetails.providerLogo) {
      try {
        savedLogoPath = await downloadAndSaveImage(mobimatterDetails.providerLogo);
      } catch (error) {
        console.log(`⚠️  無法下載 Logo: ${error.message}`);
      }
    }

    if (existingProduct) {
      // 更新現有產品
      console.log(`📝 更新現有產品: ${productName}`);
      await existingProduct.update({ 
        name: productName, 
        enabled, 
        productCategory: mobimatterDetails.productCategory 
      });

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

      const updatedProduct = await Product.findByPk(existingProduct.id, { 
        include: [{ model: ProductDetail, required: false }] 
      });
      
      displayProductInfo(updatedProduct, updatedProduct.ProductDetail);
      return { success: true, action: 'updated', product: updatedProduct };
    } else {
      // 創建新產品
      console.log(`➕ 創建新產品: ${productName}`);
      const product = await Product.create({
        productId,
        name: productName,
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

      const newProduct = await Product.findByPk(product.id, { 
        include: [{ model: ProductDetail, required: false }] 
      });
      
      displayProductInfo(newProduct, newProduct.ProductDetail);
      return { success: true, action: 'created', product: newProduct };
    }
  } catch (error) {
    console.error(`❌ 處理產品 ${productId} 時發生錯誤:`, error.message);
    return { success: false, error: error.message, productId };
  }
}

// 從檔案讀取產品 ID 列表
async function readProductIdsFromFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#')); // 忽略空行和註釋
    
    return lines;
  } catch (error) {
    throw new Error(`無法讀取檔案 ${filePath}: ${error.message}`);
  }
}

// 批量處理產品
async function batchProcessProducts(productIds, enabled = true) {
  console.log(`🚀 開始批量處理 ${productIds.length} 個產品...\n`);
  
  const results = {
    total: productIds.length,
    created: 0,
    updated: 0,
    failed: 0,
    errors: []
  };

  for (let i = 0; i < productIds.length; i++) {
    const productId = productIds[i];
    console.log(`\n[${i + 1}/${productIds.length}] 處理產品: ${productId}`);
    
    const result = await createOrUpdateProduct(productId, enabled);
    
    if (result.success) {
      if (result.action === 'created') {
        results.created++;
      } else {
        results.updated++;
      }
    } else {
      results.failed++;
      results.errors.push({ productId, error: result.error });
    }

    // 添加延遲避免 API 限制
    if (i < productIds.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return results;
}

async function addProducts() {
  console.log('📦 批量產品管理工具');
  console.log('==================\n');

  try {
    // 驗證環境變數
    validateEnvironmentVariables();
    
    // 檢查資料庫連接
    await sequelize.authenticate();
    console.log('✅ 資料庫連接成功\n');

    // 選擇輸入方式
    console.log('請選擇產品 ID 輸入方式:');
    console.log('1. 手動輸入（一個一個輸入）');
    console.log('2. 從檔案讀取（每行一個 product ID）');
    console.log('3. 批量輸入（用逗號分隔）');
    
    const inputMethod = await question('\n請選擇 (1-3): ');
    
    let productIds = [];
    let enabled = true;

    switch (inputMethod) {
      case '1':
        // 手動輸入
        console.log('\n📝 手動輸入模式');
        console.log('輸入 "done" 完成輸入，輸入 "cancel" 取消操作\n');
        
        while (true) {
          const productId = await question('請輸入 Product ID: ');
          if (productId.toLowerCase() === 'done') break;
          if (productId.toLowerCase() === 'cancel') {
            console.log('❌ 已取消操作');
            rl.close();
            return;
          }
          
          const validationError = validateProductId(productId);
          if (validationError) {
            console.log(`❌ ${validationError}\n`);
            continue;
          }
          
          productIds.push(productId.trim());
        }
        break;

      case '2':
        // 從檔案讀取
        console.log('\n📁 檔案讀取模式');
        const filePath = await question('請輸入檔案路徑: ');
        
        if (!fs.existsSync(filePath)) {
          console.log('❌ 檔案不存在');
          rl.close();
          return;
        }
        
        productIds = await readProductIdsFromFile(filePath);
        break;

      case '3':
        // 批量輸入
        console.log('\n📋 批量輸入模式');
        const batchInput = await question('請輸入 Product ID（用逗號分隔）: ');
        productIds = batchInput.split(',')
          .map(id => id.trim())
          .filter(id => id);
        break;

      default:
        console.log('❌ 無效的選擇');
        rl.close();
        return;
    }

    if (productIds.length === 0) {
      console.log('❌ 沒有有效的 Product ID');
      rl.close();
      return;
    }

    // 確認產品狀態
    const statusInput = await question('\n產品狀態 (1=啟用, 2=停用): ');
    enabled = statusInput === '2' ? false : true;

    // 顯示確認信息
    console.log('\n📋 請確認以下信息:');
    console.log(`產品數量: ${productIds.length}`);
    console.log(`產品狀態: ${enabled ? '啟用' : '停用'}`);
    console.log('產品 ID 列表:');
    productIds.forEach((id, index) => {
      console.log(`  ${index + 1}. ${id}`);
    });

    const confirm = await question('\n是否確認執行? (y/N): ');
    if (confirm.toLowerCase() !== 'y' && confirm.toLowerCase() !== 'yes') {
      console.log('❌ 已取消操作');
      rl.close();
      return;
    }

    // 執行批量處理
    const results = await batchProcessProducts(productIds, enabled);

    // 顯示結果
    console.log('\n📊 處理結果:');
    console.log('─'.repeat(50));
    console.log(`總數: ${results.total}`);
    console.log(`✅ 新增: ${results.created}`);
    console.log(`📝 更新: ${results.updated}`);
    console.log(`❌ 失敗: ${results.failed}`);
    
    if (results.errors.length > 0) {
      console.log('\n❌ 錯誤詳情:');
      results.errors.forEach(error => {
        console.log(`  ${error.productId}: ${error.error}`);
      });
    }

    console.log('\n🎉 批量處理完成!');

  } catch (error) {
    console.error('❌ 程序執行失敗:', error.message);
  } finally {
    rl.close();
    await sequelize.close();
  }
}

// 如果直接執行此腳本
if (require.main === module) {
  addProducts().catch(error => {
    console.error('❌ 程序執行失敗:', error);
    process.exit(1);
  });
}

module.exports = addProducts; 