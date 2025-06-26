const { Sequelize } = require('sequelize');
const path = require('path');

// 資料庫連接配置
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', 'db.sqlite'),
    logging: false
});

async function unlockAdminAccount() {
    try {
        // 測試資料庫連接
        await sequelize.authenticate();
        console.log('✅ 資料庫連接成功');

        // 查詢所有管理員帳號
        const [adminUsers] = await sequelize.query(`
            SELECT id, username, fullName, email, role, loginAttempts, lockedUntil, lastFailedLoginAt
            FROM Users 
            WHERE role = 'admin' AND isActive = 1
            ORDER BY id
        `);

        console.log('\n📋 找到的管理員帳號:');
        adminUsers.forEach((user, index) => {
            console.log(`${index + 1}. ID: ${user.id} | 用戶名: ${user.username} | 姓名: ${user.fullName}`);
            console.log(`   登入失敗次數: ${user.loginAttempts} | 鎖定狀態: ${user.lockedUntil ? '已鎖定' : '未鎖定'}`);
            if (user.lockedUntil) {
                console.log(`   鎖定時間: ${user.lockedUntil}`);
            }
            console.log('');
        });

        if (adminUsers.length === 0) {
            console.log('❌ 沒有找到管理員帳號');
            return;
        }

        // 解鎖所有管理員帳號
        const unlockResult = await sequelize.query(`
            UPDATE Users 
            SET loginAttempts = 0, 
                lockedUntil = NULL, 
                lastFailedLoginAt = NULL,
                updatedAt = datetime('now')
            WHERE role = 'admin' AND isActive = 1
        `);

        console.log('🔓 已解鎖所有管理員帳號');
        console.log(`   影響的行數: ${unlockResult[0].changes}`);

        // 再次查詢確認解鎖結果
        const [updatedAdminUsers] = await sequelize.query(`
            SELECT id, username, fullName, loginAttempts, lockedUntil
            FROM Users 
            WHERE role = 'admin' AND isActive = 1
            ORDER BY id
        `);

        console.log('\n✅ 解鎖後的狀態:');
        updatedAdminUsers.forEach((user, index) => {
            console.log(`${index + 1}. ${user.username} (${user.fullName})`);
            console.log(`   登入失敗次數: ${user.loginAttempts} | 鎖定狀態: ${user.lockedUntil ? '已鎖定' : '未鎖定'}`);
        });

        console.log('\n🎉 管理員帳號解鎖完成！您現在可以使用管理員帳號登入了。');

    } catch (error) {
        console.error('❌ 解鎖失敗:', error.message);
        console.error('詳細錯誤:', error);
    } finally {
        await sequelize.close();
    }
}

// 執行解鎖
unlockAdminAccount(); 