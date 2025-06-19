const responseHandler = require('../utils/responseHandler');
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const loginAttemptService = require('../services/loginAttemptService');

const authController = {
    // 用戶登入
    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            // 從資料庫查找用戶
            const user = await User.findOne({
                where: { 
                    username,
                    isActive: true
                }
            });

            if (!user) {
                return responseHandler.unauthorized(res, '帳號或密碼錯誤');
            }

            // 檢查用戶是否被鎖定
            const lockStatus = loginAttemptService.isUserLocked(user);
            if (lockStatus.locked) {
                return responseHandler.unauthorized(res, `帳號已被鎖定，請在 ${lockStatus.remainingTime} 分鐘後再試`);
            }

            // 驗證密碼
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                // 記錄登入失敗
                await loginAttemptService.recordFailedLogin(user);
                
                // 獲取更新後的登入嘗試資訊
                const attemptInfo = loginAttemptService.getLoginAttemptInfo(user);
                
                let errorMessage = '帳號或密碼錯誤';
                if (attemptInfo.isLocked) {
                    errorMessage = `帳號已被鎖定，請在 ${attemptInfo.remainingLockTime} 分鐘後再試`;
                } else if (attemptInfo.remainingAttempts <= 2) {
                    errorMessage = `帳號或密碼錯誤，還剩 ${attemptInfo.remainingAttempts} 次嘗試機會`;
                }

                return responseHandler.unauthorized(res, errorMessage);
            }

            // 登入成功，重置登入嘗試次數
            await loginAttemptService.resetLoginAttempts(user);

            // 更新最後登入時間
            await user.update({ lastLoginAt: new Date() });

            // 生成 JWT token
            const token = jwt.sign(
                { id: user.id, username: user.username, role: user.role },
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '24h' }
            );

            // 返回用戶資料（不包含密碼）
            const userData = {
                id: user.id,
                username: user.username,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
                totpEnabled: user.totpEnabled,
                abilityRules: getAbilityRules(user.role)
            };

            return res.json({
                user: userData,
                accessToken: token
            });
        } catch (error) {
            console.error('登入失敗:', error);
            return responseHandler.error(res, '登入失敗', 500, error.message);
        }
    },

    // 獲取用戶資料
    getProfile: async (req, res) => {
        try {
            const userId = req.user.id;
            const user = await User.findByPk(userId, {
                attributes: { exclude: ['password', 'totpSecret'] }
            });

            if (!user) {
                return responseHandler.notFound(res, '用戶不存在');
            }

            const userData = {
                ...user.toJSON(),
                abilityRules: getAbilityRules(user.role)
            };

            return responseHandler.success(res, userData, '成功獲取用戶資料');
        } catch (error) {
            console.error('獲取用戶資料失敗:', error);
            return responseHandler.error(res, '獲取用戶資料失敗', 500, error.message);
        }
    },

    // 獲取登入嘗試次數資訊（管理員用）
    getLoginAttemptInfo: async (req, res) => {
        try {
            const { userId } = req.params;
            
            // 檢查當前用戶是否為管理員
            if (req.user.role !== 'admin') {
                return responseHandler.forbidden(res, '權限不足');
            }

            const user = await User.findByPk(userId);
            if (!user) {
                return responseHandler.notFound(res, '用戶不存在');
            }

            const attemptInfo = loginAttemptService.getLoginAttemptInfo(user);
            return responseHandler.success(res, attemptInfo, '成功獲取登入嘗試次數資訊');
        } catch (error) {
            console.error('獲取登入嘗試次數資訊失敗:', error);
            return responseHandler.error(res, '獲取登入嘗試次數資訊失敗', 500, error.message);
        }
    },

    // 手動解鎖用戶帳號（管理員用）
    unlockUser: async (req, res) => {
        try {
            const { userId } = req.params;
            
            // 檢查當前用戶是否為管理員
            if (req.user.role !== 'admin') {
                return responseHandler.forbidden(res, '權限不足');
            }

            const user = await loginAttemptService.unlockUser(userId);
            return responseHandler.success(res, { userId: user.id }, '成功解鎖用戶帳號');
        } catch (error) {
            console.error('解鎖用戶帳號失敗:', error);
            return responseHandler.error(res, '解鎖用戶帳號失敗', 500, error.message);
        }
    },

    // 錯誤處理
    handleError: async (req, res) => {
        try {
            const { error } = req.query;
            const errorData = JSON.parse(error);
            
            return res.status(errorData.status || 500).json({
                message: errorData.message || '發生錯誤'
            });
        } catch (e) {
            console.error('錯誤處理失敗:', e);
            return responseHandler.error(res, '錯誤處理失敗', 500, e.message);
        }
    }
};

// 根據角色返回權限規則
function getAbilityRules(role) {
    switch (role) {
        case 'admin':
            return [
                { action: 'manage', subject: 'all' }
            ];
        case 'operator':
            return [
                { action: 'read', subject: 'all' },
                { action: 'create', subject: 'Customer' },
                { action: 'update', subject: 'Customer' },
                { action: 'create', subject: 'Order' },
                { action: 'update', subject: 'Order' },
                { action: 'read', subject: 'Card' },
                { action: 'update', subject: 'Card' }
            ];
        case 'viewer':
            return [
                { action: 'read', subject: 'all' }
            ];
        default:
            return [
                { action: 'read', subject: 'Auth' }
            ];
    }
}

module.exports = authController; 