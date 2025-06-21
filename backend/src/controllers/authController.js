const responseHandler = require('../utils/responseHandler');
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const loginAttemptService = require('../services/loginAttemptService');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const crypto = require('crypto');

const authController = {
    // 用戶登入
    login: async (req, res) => {
        try {
            const { username, password, totpToken } = req.body;

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

            // 如果用戶啟用了 TOTP，需要驗證 TOTP 代碼
            if (user.totpEnabled) {
                if (!totpToken) {
                    // 密碼正確但需要 TOTP 驗證
                    return res.status(403).json({
                        requireTotp: true,
                        userId: user.id,
                        message: '需要 TOTP 驗證'
                    });
                }

                // 檢查是否為備用代碼
                if (totpToken.startsWith('backup_')) {
                    const backupCode = totpToken.substring(7); // 移除 'backup_' 前綴
                    
                    // 檢查備用代碼
                    if (!user.backupCodes || !user.backupCodes.includes(backupCode)) {
                        return responseHandler.unauthorized(res, '備用代碼錯誤');
                    }

                    // 移除已使用的備用代碼
                    const backupCodes = user.backupCodes.filter(code => code !== backupCode);
                    await user.update({ backupCodes: backupCodes });
                } else {
                    // 驗證 TOTP 代碼
                    const verified = speakeasy.totp.verify({
                        secret: user.totpSecret,
                        encoding: 'base32',
                        token: totpToken,
                        window: 2
                    });

                    if (!verified) {
                        return responseHandler.unauthorized(res, 'TOTP 驗證碼錯誤');
                    }
                }
            }

            // 登入成功，重置登入嘗試次數
            await loginAttemptService.resetLoginAttempts(user);

            // 更新最後登入時間
            await user.update({ lastLoginAt: new Date() });

            // 生成 JWT token
            const token = jwt.sign(
                { id: user.id, username: user.username, role: user.role },
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
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

    // 用戶登出
    logout: async (req, res) => {
        // 在無狀態的 JWT 認證中，登出通常由客戶端處理（例如，刪除 token）
        // 伺服器端可以選擇性地將 token 加入黑名單
        return responseHandler.success(res, null, '登出成功');
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

    // 修改密碼
    changePassword: async (req, res) => {
        try {
            const { currentPassword, newPassword } = req.body;
            const userId = req.user.id;

            // 驗證輸入
            if (!currentPassword || !newPassword) {
                return responseHandler.badRequest(res, '請提供當前密碼和新密碼');
            }

            // 密碼強度驗證
            if (newPassword.length < 8) {
                return responseHandler.badRequest(res, '新密碼至少需要8個字元');
            }

            // 查找用戶
            const user = await User.findByPk(userId);
            if (!user) {
                return responseHandler.notFound(res, '用戶不存在');
            }

            // 驗證當前密碼
            const isValidCurrentPassword = await bcrypt.compare(currentPassword, user.password);
            if (!isValidCurrentPassword) {
                return responseHandler.unauthorized(res, '當前密碼錯誤');
            }

            // 檢查新密碼是否與當前密碼相同
            const isSamePassword = await bcrypt.compare(newPassword, user.password);
            if (isSamePassword) {
                return responseHandler.badRequest(res, '新密碼不能與當前密碼相同');
            }

            // 加密新密碼
            const hashedNewPassword = await bcrypt.hash(newPassword, 10);

            // 更新密碼
            await user.update({
                password: hashedNewPassword
            });

            // 重置登入嘗試次數（防止因為密碼修改導致的鎖定）
            await loginAttemptService.resetLoginAttempts(user);

            return responseHandler.success(res, null, '密碼修改成功');
        } catch (error) {
            console.error('修改密碼失敗:', error);
            return responseHandler.error(res, '修改密碼失敗', 500, error.message);
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
    },

    // 生成 TOTP 設置
    generateTotpSetup: async (req, res) => {
        try {
            const userId = req.user.id;
            const user = await User.findByPk(userId);
            
            if (!user) {
                return responseHandler.notFound(res, '用戶不存在');
            }

            // 如果已經啟用 TOTP，返回錯誤
            if (user.totpEnabled) {
                return responseHandler.badRequest(res, 'TOTP 已經啟用');
            }

            // 生成新的 TOTP secret
            const secret = speakeasy.generateSecret({
                name: `Esim Management (${user.email})`,
                issuer: 'Esim Management',
                length: 32
            });

            // 生成 QR code
            const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url);

            // 暫時保存 secret（不更新到資料庫，直到驗證成功）
            return responseHandler.success(res, {
                secret: secret.base32,
                qrCode: qrCodeUrl,
                otpauthUrl: secret.otpauth_url
            }, '成功生成 TOTP 設置');
        } catch (error) {
            console.error('生成 TOTP 設置失敗:', error);
            return responseHandler.error(res, '生成 TOTP 設置失敗', 500, error.message);
        }
    },

    // 驗證並啟用 TOTP
    enableTotp: async (req, res) => {
        try {
            const { secret, token } = req.body;
            const userId = req.user.id;

            if (!secret || !token) {
                return responseHandler.badRequest(res, '請提供 secret 和驗證碼');
            }

            const user = await User.findByPk(userId);
            if (!user) {
                return responseHandler.notFound(res, '用戶不存在');
            }

            // 如果已經啟用 TOTP，返回錯誤
            if (user.totpEnabled) {
                return responseHandler.badRequest(res, 'TOTP 已經啟用');
            }

            // 驗證 TOTP 代碼
            const verified = speakeasy.totp.verify({
                secret: secret,
                encoding: 'base32',
                token: token,
                window: 2 // 允許前後 2 個時間窗口的偏差
            });

            if (!verified) {
                return responseHandler.unauthorized(res, '驗證碼錯誤');
            }

            // 生成備用代碼
            const backupCodes = [];
            for (let i = 0; i < 10; i++) {
                backupCodes.push(speakeasy.generateSecret({ length: 10 }).base32);
            }

            // 更新用戶資料
            await user.update({
                totpSecret: secret,
                totpEnabled: true,
                backupCodes: backupCodes
            });

            return responseHandler.success(res, {
                backupCodes: backupCodes
            }, 'TOTP 啟用成功');
        } catch (error) {
            console.error('啟用 TOTP 失敗:', error);
            return responseHandler.error(res, '啟用 TOTP 失敗', 500, error.message);
        }
    },

    // 使用備用代碼
    useBackupCode: async (req, res) => {
        try {
            const { userId, backupCode } = req.body;

            if (!userId || !backupCode) {
                return responseHandler.badRequest(res, '請提供用戶 ID 和備用代碼');
            }

            const user = await User.findByPk(userId);
            if (!user) {
                return responseHandler.notFound(res, '用戶不存在');
            }

            if (!user.totpEnabled || !user.backupCodes) {
                return responseHandler.badRequest(res, 'TOTP 未啟用或無備用代碼');
            }

            // 檢查備用代碼
            const backupCodes = user.backupCodes;
            const codeIndex = backupCodes.indexOf(backupCode);

            if (codeIndex === -1) {
                return responseHandler.unauthorized(res, '備用代碼錯誤');
            }

            // 移除已使用的備用代碼
            backupCodes.splice(codeIndex, 1);
            await user.update({ backupCodes: backupCodes });

            // 備用代碼驗證成功，生成 JWT token
            const jwtToken = jwt.sign(
                { id: user.id, username: user.username, role: user.role },
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
            );

            // 更新最後登入時間
            await user.update({ lastLoginAt: new Date() });

            // 返回用戶資料和 token
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
                accessToken: jwtToken
            });
        } catch (error) {
            console.error('使用備用代碼失敗:', error);
            return responseHandler.error(res, '使用備用代碼失敗', 500, error.message);
        }
    },

    // 禁用 TOTP
    disableTotp: async (req, res) => {
        try {
            const { password } = req.body;
            const userId = req.user.id;

            if (!password) {
                return responseHandler.badRequest(res, '請提供密碼');
            }

            const user = await User.findByPk(userId);
            if (!user) {
                return responseHandler.notFound(res, '用戶不存在');
            }

            // 驗證密碼
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return responseHandler.unauthorized(res, '密碼錯誤');
            }

            // 禁用 TOTP
            await user.update({
                totpSecret: null,
                totpEnabled: false,
                backupCodes: null
            });

            return responseHandler.success(res, null, 'TOTP 已禁用');
        } catch (error) {
            console.error('禁用 TOTP 失敗:', error);
            return responseHandler.error(res, '禁用 TOTP 失敗', 500, error.message);
        }
    },

    // 重新生成備用代碼
    regenerateBackupCodes: async (req, res) => {
        try {
            const { password } = req.body;
            const userId = req.user.id;

            if (!password) {
                return responseHandler.badRequest(res, '請提供密碼');
            }

            const user = await User.findByPk(userId);
            if (!user) {
                return responseHandler.notFound(res, '用戶不存在');
            }

            if (!user.totpEnabled) {
                return responseHandler.badRequest(res, 'TOTP 未啟用');
            }

            // 驗證密碼
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return responseHandler.unauthorized(res, '密碼錯誤');
            }

            // 生成新的備用代碼
            const backupCodes = [];
            for (let i = 0; i < 10; i++) {
                backupCodes.push(speakeasy.generateSecret({ length: 10 }).base32);
            }

            // 更新備用代碼
            await user.update({ backupCodes: backupCodes });

            return responseHandler.success(res, {
                backupCodes: backupCodes
            }, '備用代碼重新生成成功');
        } catch (error) {
            console.error('重新生成備用代碼失敗:', error);
            return responseHandler.error(res, '重新生成備用代碼失敗', 500, error.message);
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