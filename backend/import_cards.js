const fs = require('fs');
const path = require('path');
const sequelize = require('./src/db');
const { Card } = require('./src/models');

async function importCards() {
  try {
    // 讀取備份檔案
    const backupPath = path.join(__dirname, 'cards_backup.json');
    const backupData = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
    
    console.log(`準備匯入 ${backupData.length} 筆卡片記錄...`);
    
    // 測試資料庫連線
    await sequelize.authenticate();
    console.log('資料庫連線成功');
    
    // 同步模型（確保表格存在）
    await sequelize.sync();
    console.log('資料庫表格同步完成');
    
    let successCount = 0;
    let errorCount = 0;
    
    // 逐筆匯入資料
    for (const cardData of backupData) {
      try {
        // 檢查是否已存在相同的 ICCID
        const existingCard = await Card.findOne({
          where: { iccid: cardData.iccid }
        });
        
        if (existingCard) {
          console.log(`ICCID ${cardData.iccid} 已存在，跳過...`);
          continue;
        }
        
        // 準備資料，注意欄位名稱的對應
        const cardToInsert = {
          id: cardData.id,
          customerId: cardData.userId, // 注意：備份中是 userId，但模型中是 customerId
          orderId: cardData.orderId,
          iccid: cardData.iccid,
          purchasedAt: new Date(cardData.purchasedAt),
          expiredAt: cardData.expiredAt ? new Date(cardData.expiredAt) : null,
          qrcode: cardData.qrcode,
          esimInfo: typeof cardData.esimInfo === 'string' ? JSON.parse(cardData.esimInfo) : cardData.esimInfo
        };
        
        // 插入資料
        await Card.create(cardToInsert);
        console.log(`成功匯入 ICCID: ${cardData.iccid}`);
        successCount++;
        
      } catch (error) {
        console.error(`匯入 ICCID ${cardData.iccid} 失敗:`, error.message);
        errorCount++;
      }
    }
    
    console.log('\n=== 匯入完成 ===');
    console.log(`成功匯入: ${successCount} 筆`);
    console.log(`失敗: ${errorCount} 筆`);
    console.log(`總計處理: ${backupData.length} 筆`);
    
  } catch (error) {
    console.error('匯入過程發生錯誤:', error);
  } finally {
    // 關閉資料庫連線
    await sequelize.close();
    console.log('資料庫連線已關閉');
  }
}

// 執行匯入
importCards(); 