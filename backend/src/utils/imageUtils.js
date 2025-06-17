// TODO : 圖片處理
const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');
const crypto = require('crypto');

const UPLOAD_DIR = path.join(__dirname, '../uploads');
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3030';

// 確保上傳目錄存在
const ensureUploadDir = async () => {
  try {
    await fs.access(UPLOAD_DIR);
  } catch {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
  }
};

// 生成唯一的檔案名稱
const generateUniqueFileName = (originalUrl) => {
  const extension = path.extname(originalUrl) || '.png';
  const hash = crypto.createHash('md5').update(originalUrl).digest('hex');
  return `${hash}${extension}`;
};

// 下載並儲存圖片
const downloadAndSaveImage = async (imageUrl) => {
  try {
    await ensureUploadDir();
    
    const fileName = generateUniqueFileName(imageUrl);
    const filePath = path.join(UPLOAD_DIR, fileName);
    
    // 檢查檔案是否已存在
    try {
      await fs.access(filePath);
      return `${API_BASE_URL}/uploads/${fileName}`; // 返回絕對路徑
    } catch {
      // 檔案不存在，繼續下載
    }
    
    const response = await axios({
      method: 'GET',
      url: imageUrl,
      responseType: 'arraybuffer'
    });
    
    await fs.writeFile(filePath, response.data);
    return `${API_BASE_URL}/uploads/${fileName}`; // 返回絕對路徑
  } catch (error) {
    console.error('Error downloading and saving image:', error);
    return imageUrl; // 如果發生錯誤，返回原始 URL
  }
};

module.exports = {
  downloadAndSaveImage
}; 