#!/usr/bin/env node

const readline = require('readline');
const path = require('path');
const fs = require('fs');

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

// 定義可用的腳本
const scripts = [
  {
    id: '1',
    name: '創建管理員帳號',
    description: '創建新的管理員用戶帳號',
    file: 'create-admin.js',
    function: null
  },
  {
    id: '2',
    name: '修改用戶密碼',
    description: '修改指定用戶的密碼',
    file: 'change-user-password.js',
    function: null
  },
  {
    id: '3',
    name: '解鎖管理員帳號',
    description: '解鎖被鎖定的管理員帳號',
    file: 'unlock-admin.js',
    function: null
  }
];

// 顯示主選單
function displayMenu() {
  console.log('\n🔧 後端管理工具');
  console.log('================\n');
  
  scripts.forEach(script => {
    console.log(`${script.id}. ${script.name}`);
    console.log(`   ${script.description}`);
    console.log('');
  });
  
  console.log('0. 退出');
  console.log('');
}

// 執行選定的腳本
async function executeScript(scriptId) {
  const script = scripts.find(s => s.id === scriptId);
  
  if (!script) {
    console.log('❌ 無效的選項');
    return;
  }

  const scriptPath = path.join(__dirname, 'scripts', script.file);
  
  // 檢查腳本文件是否存在
  if (!fs.existsSync(scriptPath)) {
    console.log(`❌ 腳本文件不存在: ${script.file}`);
    return;
  }

  console.log(`\n🚀 正在執行: ${script.name}`);
  console.log('='.repeat(50));

  try {
    // 動態載入並執行腳本
    const scriptModule = require(scriptPath);
    
    if (typeof scriptModule === 'function') {
      await scriptModule();
    } else {
      console.log('❌ 腳本格式錯誤');
    }
  } catch (error) {
    console.error(`❌ 執行腳本失敗: ${error.message}`);
    if (error.stack) {
      console.error('詳細錯誤:', error.stack);
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('✅ 腳本執行完成');
}

// 主程序
async function main() {
  console.log('🎯 歡迎使用後端管理工具集');
  console.log('請選擇要執行的工具:\n');

  while (true) {
    displayMenu();
    
    const choice = await question('請輸入選項 (0-3): ');
    
    if (choice === '0') {
      console.log('\n👋 感謝使用，再見！');
      break;
    }
    
    if (['1', '2', '3'].includes(choice)) {
      await executeScript(choice);
      
      const continueChoice = await question('\n是否繼續使用其他工具? (y/N): ');
      if (continueChoice.toLowerCase() !== 'y' && continueChoice.toLowerCase() !== 'yes') {
        console.log('\n👋 感謝使用，再見！');
        break;
      }
    } else {
      console.log('❌ 請輸入有效的選項 (0-3)');
    }
  }
  
  rl.close();
}

// 處理程序退出
process.on('SIGINT', () => {
  console.log('\n\n👋 程序被中斷，再見！');
  rl.close();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n\n👋 程序被終止，再見！');
  rl.close();
  process.exit(0);
});

// 如果直接執行此腳本
if (require.main === module) {
  main().catch(error => {
    console.error('❌ 程序執行失敗:', error);
    process.exit(1);
  });
}

module.exports = { main, scripts }; 