const { User } = require('./src/models');
const bcrypt = require('bcryptjs');

async function createAdmin() {
    try {
        // 檢查是否已存在管理員
        const existingAdmin = await User.findOne({ where: { username: 'admin' } });
        
        if (existingAdmin) {
            console.log('✅ 管理員用戶已存在');
            return existingAdmin;
        }

        // 創建管理員用戶
        const hashedPassword = await bcrypt.hash('admin123', 10);
        const admin = await User.create({
            username: 'admin',
            password: hashedPassword,
            fullName: '系統管理員',
            email: 'admin@example.com',
            role: 'admin'
        });

        console.log('✅ 管理員用戶創建成功');
        return admin;
    } catch (error) {
        console.error('❌ 創建管理員失敗:', error);
    }
}

createAdmin(); 