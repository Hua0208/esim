const readline = require('readline');
const bcrypt = require('bcryptjs');
const { User } = require('./src/models');
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

// 驗證 email 格式
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// 驗證密碼強度
function validatePassword(password) {
  if (password.length < 6) {
    return '密碼長度至少需要 6 個字符';
  }
  if (password.length > 50) {
    return '密碼長度不能超過 50 個字符';
  }
  return null;
}

// 驗證用戶名
function validateUsername(username) {
  if (username.length < 3) {
    return '用戶名長度至少需要 3 個字符';
  }
  if (username.length > 30) {
    return '用戶名長度不能超過 30 個字符';
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return '用戶名只能包含字母、數字和下劃線';
  }
  return null;
}

async function createAdminUser() {
  console.log('🔧 創建管理員帳號工具');
  console.log('========================\n');

  try {
    // 檢查資料庫連接
    await sequelize.authenticate();
    console.log('✅ 資料庫連接成功\n');

    let username, email, password, fullName;

    // 輸入用戶名
    while (true) {
      username = await question('請輸入用戶名: ');
      const usernameError = validateUsername(username);
      if (usernameError) {
        console.log(`❌ ${usernameError}\n`);
        continue;
      }

      // 檢查用戶名是否已存在
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        console.log('❌ 該用戶名已被使用，請選擇其他用戶名\n');
        continue;
      }
      break;
    }

    // 輸入電子郵件
    while (true) {
      email = await question('請輸入電子郵件: ');
      if (!isValidEmail(email)) {
        console.log('❌ 請輸入有效的電子郵件地址\n');
        continue;
      }

      // 檢查電子郵件是否已存在
      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail) {
        console.log('❌ 該電子郵件已被使用，請使用其他電子郵件\n');
        continue;
      }
      break;
    }

    // 輸入全名
    while (true) {
      fullName = await question('請輸入全名: ');
      if (fullName.trim().length < 2) {
        console.log('❌ 全名至少需要 2 個字符\n');
        continue;
      }
      if (fullName.trim().length > 50) {
        console.log('❌ 全名不能超過 50 個字符\n');
        continue;
      }
      break;
    }

    // 輸入密碼
    while (true) {
      password = await question('請輸入密碼: ');
      const passwordError = validatePassword(password);
      if (passwordError) {
        console.log(`❌ ${passwordError}\n`);
        continue;
      }
      break;
    }

    // 確認密碼
    while (true) {
      const confirmPassword = await question('請再次輸入密碼確認: ');
      if (password !== confirmPassword) {
        console.log('❌ 兩次輸入的密碼不一致，請重新輸入\n');
        continue;
      }
      break;
    }

    // 顯示確認信息
    console.log('\n📋 請確認以下信息:');
    console.log(`用戶名: ${username}`);
    console.log(`電子郵件: ${email}`);
    console.log(`全名: ${fullName}`);
    console.log(`角色: admin`);

    const confirm = await question('\n是否確認創建此管理員帳號? (y/N): ');
    if (confirm.toLowerCase() !== 'y' && confirm.toLowerCase() !== 'yes') {
      console.log('❌ 已取消創建管理員帳號');
      rl.close();
      return;
    }

    // 創建管理員帳號
    console.log('\n🔄 正在創建管理員帳號...');
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const adminUser = await User.create({
      username: username.trim(),
      password: hashedPassword,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      role: 'admin',
      avatar: '/images/avatars/avatar-admin.png',
      isActive: true
    });

    console.log('✅ 管理員帳號創建成功!');
    console.log(`📝 帳號 ID: ${adminUser.id}`);
    console.log(`👤 用戶名: ${adminUser.username}`);
    console.log(`📧 電子郵件: ${adminUser.email}`);
    console.log(`👨‍💼 角色: ${adminUser.role}`);
    console.log('\n🔐 請妥善保管您的登入憑證');

  } catch (error) {
    console.error('❌ 創建管理員帳號失敗:', error.message);
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
  createAdminUser().catch(error => {
    console.error('❌ 程序執行失敗:', error);
    process.exit(1);
  });
}

module.exports = createAdminUser; 