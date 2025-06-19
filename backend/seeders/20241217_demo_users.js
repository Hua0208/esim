const bcrypt = require('bcryptjs');
const { User } = require('../src/models');

async function seedUsers() {
  try {
    // 創建管理員帳號
    const adminPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      username: 'admin',
      password: adminPassword,
      fullName: '系統管理員',
      email: 'admin@example.com',
      role: 'admin',
      avatar: '/images/avatars/avatar-cat.png',
      isActive: true
    });

    // 創建操作員帳號
    const operatorPassword = await bcrypt.hash('operator123', 10);
    await User.create({
      username: 'operator',
      password: operatorPassword,
      fullName: '操作員',
      email: 'operator@example.com',
      role: 'operator',
      avatar: '/images/avatars/avatar-2.png',
      isActive: true
    });

    // 創建查看者帳號
    const viewerPassword = await bcrypt.hash('viewer123', 10);
    await User.create({
      username: 'viewer',
      password: viewerPassword,
      fullName: '查看者',
      email: 'viewer@example.com',
      role: 'viewer',
      avatar: '/images/avatars/avatar-3.png',
      isActive: true
    });

    console.log('✅ 初始操作者資料創建成功');
  } catch (error) {
    console.error('❌ 創建初始操作者資料失敗:', error);
  }
}

// 如果直接執行此腳本
if (require.main === module) {
  const sequelize = require('../src/db');
  
  sequelize.sync({ force: true }).then(async () => {
    console.log('🔄 資料庫同步完成');
    await seedUsers();
    process.exit(0);
  }).catch(error => {
    console.error('❌ 資料庫同步失敗:', error);
    process.exit(1);
  });
}

module.exports = seedUsers; 