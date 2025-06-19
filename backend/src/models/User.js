module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    role: {
      type: DataTypes.ENUM('admin', 'operator', 'viewer'),
      allowNull: false,
      defaultValue: 'operator'
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    },
    totpSecret: {
      type: DataTypes.STRING,
      allowNull: true
    },
    totpEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    backupCodes: {
      type: DataTypes.JSON,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    lastLoginAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    loginAttempts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '登入失敗次數'
    },
    lockedUntil: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: '帳號鎖定時間'
    },
    lastFailedLoginAt: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: '最後登入失敗時間'
    }
  }, {
    tableName: 'Users',
    timestamps: true
  });

  User.associate = function(models) {
    // 操作者不需要關聯到其他業務模型
  };

  return User;
}; 