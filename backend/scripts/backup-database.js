#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// 配置
const config = {
  // 資料庫檔案路徑
  dbPath: path.join(__dirname, '..', 'db.sqlite'),
  // 備份目錄
  backupDir: path.join(__dirname, '..', 'backups'),
  // 備份檔案名稱格式
  backupNameFormat: 'backup_%Y%m%d_%H%M%S.sqlite',
  // 保留備份檔案數量
  maxBackups: 10
};

// 確保備份目錄存在
function ensureBackupDir() {
  if (!fs.existsSync(config.backupDir)) {
    fs.mkdirSync(config.backupDir, { recursive: true });
    console.log(`✅ 建立備份目錄: ${config.backupDir}`);
  }
}

// 生成備份檔案名稱
function generateBackupFileName() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  const second = String(now.getSeconds()).padStart(2, '0');
  
  return config.backupNameFormat
    .replace('%Y', year)
    .replace('%m', month)
    .replace('%d', day)
    .replace('%H', hour)
    .replace('%M', minute)
    .replace('%S', second);
}

// 檢查資料庫檔案是否存在
function checkDatabaseExists() {
  if (!fs.existsSync(config.dbPath)) {
    console.error(`❌ 錯誤: 找不到資料庫檔案 ${config.dbPath}`);
    process.exit(1);
  }
  
  const stats = fs.statSync(config.dbPath);
  console.log(`📊 資料庫檔案大小: ${(stats.size / 1024).toFixed(2)} KB`);
}

// 執行備份
function performBackup() {
  return new Promise((resolve, reject) => {
    const backupFileName = generateBackupFileName();
    const backupPath = path.join(config.backupDir, backupFileName);
    
    console.log(`🔄 開始備份資料庫...`);
    console.log(`📁 來源: ${config.dbPath}`);
    console.log(`📁 目標: ${backupPath}`);
    
    // 使用 cp 命令複製檔案
    const copyCommand = `cp "${config.dbPath}" "${backupPath}"`;
    
    exec(copyCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ 備份失敗: ${error.message}`);
        reject(error);
        return;
      }
      
      if (stderr) {
        console.warn(`⚠️  警告: ${stderr}`);
      }
      
      // 檢查備份檔案是否成功建立
      if (fs.existsSync(backupPath)) {
        const backupStats = fs.statSync(backupPath);
        console.log(`✅ 備份成功完成!`);
        console.log(`📁 備份檔案: ${backupFileName}`);
        console.log(`📊 備份大小: ${(backupStats.size / 1024).toFixed(2)} KB`);
        resolve(backupPath);
      } else {
        const error = new Error('備份檔案未成功建立');
        console.error(`❌ 備份失敗: ${error.message}`);
        reject(error);
      }
    });
  });
}

// 清理舊備份檔案
function cleanupOldBackups() {
  try {
    const files = fs.readdirSync(config.backupDir)
      .filter(file => file.endsWith('.sqlite'))
      .map(file => ({
        name: file,
        path: path.join(config.backupDir, file),
        mtime: fs.statSync(path.join(config.backupDir, file)).mtime
      }))
      .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
    
    if (files.length > config.maxBackups) {
      const filesToDelete = files.slice(config.maxBackups);
      console.log(`🧹 清理舊備份檔案...`);
      
      filesToDelete.forEach(file => {
        fs.unlinkSync(file.path);
        console.log(`🗑️  刪除: ${file.name}`);
      });
      
      console.log(`✅ 清理完成，保留最新的 ${config.maxBackups} 個備份檔案`);
    }
  } catch (error) {
    console.warn(`⚠️  清理舊備份時發生錯誤: ${error.message}`);
  }
}

// 顯示備份列表
function listBackups() {
  try {
    const files = fs.readdirSync(config.backupDir)
      .filter(file => file.endsWith('.sqlite'))
      .map(file => {
        const filePath = path.join(config.backupDir, file);
        const stats = fs.statSync(filePath);
        return {
          name: file,
          size: stats.size,
          mtime: stats.mtime
        };
      })
      .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
    
    if (files.length === 0) {
      console.log('📋 目前沒有備份檔案');
      return;
    }
    
    console.log('📋 備份檔案列表:');
    console.log('─'.repeat(80));
    console.log(`${'檔案名稱'.padEnd(25)} ${'大小'.padEnd(10)} ${'建立時間'}`);
    console.log('─'.repeat(80));
    
    files.forEach(file => {
      const size = `${(file.size / 1024).toFixed(2)} KB`;
      const time = file.mtime.toLocaleString('zh-TW');
      console.log(`${file.name.padEnd(25)} ${size.padEnd(10)} ${time}`);
    });
    
    console.log('─'.repeat(80));
    console.log(`總共 ${files.length} 個備份檔案`);
  } catch (error) {
    console.error(`❌ 讀取備份列表失敗: ${error.message}`);
  }
}

// 主函數
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  console.log('🗄️  SQLite 資料庫備份工具');
  console.log('─'.repeat(50));
  
  switch (command) {
    case 'backup':
    case undefined:
      try {
        checkDatabaseExists();
        ensureBackupDir();
        await performBackup();
        cleanupOldBackups();
        console.log('\n🎉 備份程序完成!');
      } catch (error) {
        console.error(`\n💥 備份程序失敗: ${error.message}`);
        process.exit(1);
      }
      break;
      
    case 'list':
      ensureBackupDir();
      listBackups();
      break;
      
    case 'clean':
      ensureBackupDir();
      cleanupOldBackups();
      break;
      
    case 'help':
      console.log(`
使用方式:
  node backup-database.js [command]

命令:
  backup    執行資料庫備份 (預設)
  list      顯示備份檔案列表
  clean     清理舊備份檔案
  help      顯示此說明

範例:
  node backup-database.js backup
  node backup-database.js list
  node backup-database.js clean
      `);
      break;
      
    default:
      console.error(`❌ 未知命令: ${command}`);
      console.log('使用 "node backup-database.js help" 查看可用命令');
      process.exit(1);
  }
}

// 執行主函數
if (require.main === module) {
  main().catch(error => {
    console.error(`💥 程式執行錯誤: ${error.message}`);
    process.exit(1);
  });
}

module.exports = {
  performBackup,
  listBackups,
  cleanupOldBackups
}; 