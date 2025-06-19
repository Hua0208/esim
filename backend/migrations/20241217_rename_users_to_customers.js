'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // SQLite 需要重新創建表來處理外鍵約束
    // 1. 創建新的 Cards 表（沒有外鍵約束）
    await queryInterface.createTable('Cards_new', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      customerId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      iccid: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      purchasedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      expiredAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      qrcode: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      esimInfo: {
        type: Sequelize.JSON,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // 2. 複製資料
    await queryInterface.sequelize.query(`
      INSERT INTO Cards_new (id, customerId, orderId, iccid, purchasedAt, expiredAt, qrcode, esimInfo, createdAt, updatedAt)
      SELECT id, userId, orderId, iccid, purchasedAt, expiredAt, qrcode, esimInfo, createdAt, updatedAt FROM Cards
    `);

    // 3. 刪除舊表並重命名新表
    await queryInterface.dropTable('Cards');
    await queryInterface.renameTable('Cards_new', 'Cards');

    // 4. 創建新的 Billings 表
    await queryInterface.createTable('Billings_new', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      customerId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: '已完成'
      },
      reference: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // 5. 複製資料
    await queryInterface.sequelize.query(`
      INSERT INTO Billings_new (id, customerId, date, type, amount, description, status, reference, createdAt, updatedAt)
      SELECT id, userId, date, type, amount, description, status, reference, createdAt, updatedAt FROM Billings
    `);

    // 6. 刪除舊表並重命名新表
    await queryInterface.dropTable('Billings');
    await queryInterface.renameTable('Billings_new', 'Billings');

    // 7. 重命名 Users 表為 Customers
    await queryInterface.renameTable('Users', 'Customers');

    // 8. 移除登入相關欄位
    await queryInterface.removeColumn('Customers', 'username');
    await queryInterface.removeColumn('Customers', 'password');
    await queryInterface.removeColumn('Customers', 'role');
    await queryInterface.removeColumn('Customers', 'avatar');
    await queryInterface.removeColumn('Customers', 'totpSecret');
    await queryInterface.removeColumn('Customers', 'totpEnabled');
    await queryInterface.removeColumn('Customers', 'totpBackupCodes');
    await queryInterface.removeColumn('Customers', 'lastLoginAt');
    await queryInterface.removeColumn('Customers', 'loginAttempts');
    await queryInterface.removeColumn('Customers', 'lockedUntil');

    // 9. 重新創建表以添加外鍵約束
    await queryInterface.createTable('Cards_with_fk', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      customerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          table: 'Customers',
          field: 'id'
        },
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE'
      },
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          table: 'Orders',
          field: 'id'
        },
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE'
      },
      iccid: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      purchasedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      expiredAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      qrcode: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      esimInfo: {
        type: Sequelize.JSON,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    await queryInterface.sequelize.query(`
      INSERT INTO Cards_with_fk (id, customerId, orderId, iccid, purchasedAt, expiredAt, qrcode, esimInfo, createdAt, updatedAt)
      SELECT id, customerId, orderId, iccid, purchasedAt, expiredAt, qrcode, esimInfo, createdAt, updatedAt FROM Cards
    `);

    await queryInterface.dropTable('Cards');
    await queryInterface.renameTable('Cards_with_fk', 'Cards');

    await queryInterface.createTable('Billings_with_fk', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      customerId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          table: 'Customers',
          field: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: '已完成'
      },
      reference: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    await queryInterface.sequelize.query(`
      INSERT INTO Billings_with_fk (id, customerId, date, type, amount, description, status, reference, createdAt, updatedAt)
      SELECT id, customerId, date, type, amount, description, status, reference, createdAt, updatedAt FROM Billings
    `);

    await queryInterface.dropTable('Billings');
    await queryInterface.renameTable('Billings_with_fk', 'Billings');
  },

  down: async (queryInterface, Sequelize) => {
    // 回滾操作 - 簡化版本
    await queryInterface.renameTable('Customers', 'Users');
    
    // 重新添加登入欄位
    await queryInterface.addColumn('Users', 'username', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'user_' + Date.now()
    });
    
    await queryInterface.addColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '$2a$12$default.hash.for.existing.users'
    });
    
    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.ENUM('admin', 'client', 'user'),
      defaultValue: 'user'
    });
    
    await queryInterface.addColumn('Users', 'avatar', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.addColumn('Users', 'totpSecret', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.addColumn('Users', 'totpEnabled', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });
    
    await queryInterface.addColumn('Users', 'totpBackupCodes', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    
    await queryInterface.addColumn('Users', 'lastLoginAt', {
      type: Sequelize.DATE,
      allowNull: true
    });
    
    await queryInterface.addColumn('Users', 'loginAttempts', {
      type: Sequelize.INTEGER,
      defaultValue: 0
    });
    
    await queryInterface.addColumn('Users', 'lockedUntil', {
      type: Sequelize.DATE,
      allowNull: true
    });
  }
}; 