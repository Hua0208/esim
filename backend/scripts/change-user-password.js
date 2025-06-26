const readline = require('readline');
const bcrypt = require('bcryptjs');
const { User } = require('../src/models');
const sequelize = require('../src/db');

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

// 驗證密碼強度
function validatePassword(password) {
  if (password.length < 8) {
    return '密碼長度至少需要 8 個字符';
  }
  if (password.length > 50) {
    return '密碼長度不能超過 50 個字符';
  }
  if (!/[a-z]/.test(password)) {
    return '密碼需要包含至少一個小寫字母';
  }
  if (!/[0-9!@#$%^&*(),.?":{}|<> ]/.test(password)) {
    return '密碼需要包含至少一個數字、符號或空白字元';
  }
  return null;
}

// 顯示用戶列表
async function displayUserList() {
  try {
    const users = await User.findAll({
      where: { isActive: true },
      attributes: ['id', 'username', 'fullName', 'email', 'role'],
      order: [['id', 'ASC']]
    });

    console.log('\n📋 現有用戶列表:');
    console.log('='.repeat(60));
    
    if (users.length === 0) {
      console.log('❌ 沒有找到任何用戶');
      return [];
    }

    users.forEach((user, index) => {
      console.log(`${index + 1}. ID: ${user.id} | 用戶名: ${user.username} | 姓名: ${user.fullName}`);
      console.log(`   電子郵件: ${user.email} | 角色: ${user.role}`);
      console.log('');
    });

    return users;
  } catch (error) {
    console.error('❌ 獲取用戶列表失敗:', error.message);
    return [];
  }
}

// 根據用戶名或ID查找用戶
async function findUser(identifier) {
  try {
    let user;
    
    // 嘗試按ID查找
    if (!isNaN(identifier)) {
      user = await User.findOne({
        where: { 
          id: parseInt(identifier),
          isActive: true 
        }
      });
    }
    
    // 如果按ID沒找到，嘗試按用戶名查找
    if (!user) {
      user = await User.findOne({
        where: { 
          username: identifier,
          isActive: true 
        }
      });
    }

    return user;
  } catch (error) {
    console.error('❌ 查找用戶失敗:', error.message);
    return null;
  }
}

async function changeUserPassword() {
  console.log('🔧 修改用戶密碼工具');
  console.log('==================\n');

  try {
    // 檢查資料庫連接
    await sequelize.authenticate();
    console.log('✅ 資料庫連接成功\n');

    // 顯示用戶列表
    const users = await displayUserList();
    if (users.length === 0) {
      console.log('❌ 沒有可用的用戶');
      return;
    }

    let targetUser;
    let identifier;

    // 選擇用戶
    while (true) {
      identifier = await question('請輸入用戶ID或用戶名: ');
      
      if (!identifier.trim()) {
        console.log('❌ 請輸入有效的用戶ID或用戶名\n');
        continue;
      }

      targetUser = await findUser(identifier.trim());
      
      if (!targetUser) {
        console.log('❌ 找不到指定的用戶，請檢查輸入\n');
        continue;
      }

      // 顯示選中的用戶信息
      console.log('\n✅ 找到用戶:');
      console.log(`   ID: ${targetUser.id}`);
      console.log(`   用戶名: ${targetUser.username}`);
      console.log(`   姓名: ${targetUser.fullName}`);
      console.log(`   電子郵件: ${targetUser.email}`);
      console.log(`   角色: ${targetUser.role}`);
      console.log('');

      const confirm = await question('是否要修改此用戶的密碼? (y/N): ');
      if (confirm.toLowerCase() !== 'y' && confirm.toLowerCase() !== 'yes') {
        console.log('❌ 已取消操作');
        rl.close();
        return;
      }
      break;
    }

    let newPassword;

    // 輸入新密碼
    while (true) {
      newPassword = await question('請輸入新密碼: ');
      const passwordError = validatePassword(newPassword);
      if (passwordError) {
        console.log(`❌ ${passwordError}\n`);
        continue;
      }
      break;
    }

    // 確認新密碼
    while (true) {
      const confirmPassword = await question('請再次輸入新密碼確認: ');
      if (newPassword !== confirmPassword) {
        console.log('❌ 兩次輸入的密碼不一致，請重新輸入\n');
        continue;
      }
      break;
    }

    // 顯示確認信息
    console.log('\n📋 請確認以下信息:');
    console.log(`目標用戶: ${targetUser.username} (${targetUser.fullName})`);
    console.log(`用戶ID: ${targetUser.id}`);
    console.log(`角色: ${targetUser.role}`);

    const finalConfirm = await question('\n是否確認修改此用戶的密碼? (y/N): ');
    if (finalConfirm.toLowerCase() !== 'y' && finalConfirm.toLowerCase() !== 'yes') {
      console.log('❌ 已取消修改密碼');
      rl.close();
      return;
    }

    // 修改密碼
    console.log('\n🔄 正在修改密碼...');
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await targetUser.update({
      password: hashedPassword
    });

    console.log('✅ 密碼修改成功!');
    console.log(`📝 用戶: ${targetUser.username} (${targetUser.fullName})`);
    console.log(`🆔 用戶ID: ${targetUser.id}`);
    console.log(`👨‍💼 角色: ${targetUser.role}`);
    console.log('\n🔐 新密碼已生效，用戶可以使用新密碼登入');

  } catch (error) {
    console.error('❌ 修改密碼失敗:', error.message);
    if (error.name === 'SequelizeValidationError') {
      console.error('詳細錯誤:', error.errors.map(e => e.message).join(', '));
    }
  } finally {
    rl.close();
    await sequelize.close();
  }
}

// 如果直接執行此腳本
if (require.main === module) {
  changeUserPassword().catch(error => {
    console.error('❌ 程序執行失敗:', error);
    process.exit(1);
  });
}

module.exports = changeUserPassword; 