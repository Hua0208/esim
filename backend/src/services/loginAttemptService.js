const { User } = require('../models');

class LoginAttemptService {
    constructor() {
        this.MAX_LOGIN_ATTEMPTS = process.env.MAX_LOGIN_ATTEMPTS || 5; // 最大登入嘗試次數
        this.LOCK_DURATION_MINUTES = process.env.LOCK_DURATION_MINUTES || 15; // 鎖定時間（分鐘）
    }

    /**
     * 檢查用戶是否被鎖定
     * @param {Object} user - 用戶物件
     * @returns {Object} - 包含是否被鎖定和剩餘時間的物件
     */
    isUserLocked(user) {
        if (!user.lockedUntil) {
            return { locked: false, remainingTime: 0 };
        }

        const now = new Date();
        const lockTime = new Date(user.lockedUntil);

        if (now < lockTime) {
            const remainingMs = lockTime.getTime() - now.getTime();
            const remainingMinutes = Math.ceil(remainingMs / (1000 * 60));
            return { 
                locked: true, 
                remainingTime: remainingMinutes,
                lockedUntil: user.lockedUntil
            };
        }

        // 鎖定時間已過，重置登入嘗試次數
        return { locked: false, remainingTime: 0 };
    }

    /**
     * 記錄登入失敗
     * @param {Object} user - 用戶物件
     * @returns {Promise<Object>} - 更新後的用戶物件
     */
    async recordFailedLogin(user) {
        const newAttempts = user.loginAttempts + 1;
        const now = new Date();
        
        let updateData = {
            loginAttempts: newAttempts,
            lastFailedLoginAt: now
        };

        // 如果達到最大嘗試次數，鎖定帳號
        if (newAttempts >= this.MAX_LOGIN_ATTEMPTS) {
            const lockTime = new Date(now.getTime() + (this.LOCK_DURATION_MINUTES * 60 * 1000));
            updateData.lockedUntil = lockTime;
        }

        await user.update(updateData);
        return user.reload();
    }

    /**
     * 重置登入嘗試次數（登入成功時調用）
     * @param {Object} user - 用戶物件
     * @returns {Promise<Object>} - 更新後的用戶物件
     */
    async resetLoginAttempts(user) {
        await user.update({
            loginAttempts: 0,
            lockedUntil: null,
            lastFailedLoginAt: null
        });
        return user.reload();
    }

    /**
     * 獲取登入嘗試次數資訊
     * @param {Object} user - 用戶物件
     * @returns {Object} - 登入嘗試次數資訊
     */
    getLoginAttemptInfo(user) {
        const lockStatus = this.isUserLocked(user);
        return {
            currentAttempts: user.loginAttempts,
            maxAttempts: this.MAX_LOGIN_ATTEMPTS,
            remainingAttempts: Math.max(0, this.MAX_LOGIN_ATTEMPTS - user.loginAttempts),
            isLocked: lockStatus.locked,
            remainingLockTime: lockStatus.remainingTime,
            lockedUntil: lockStatus.lockedUntil
        };
    }

    /**
     * 手動解鎖用戶帳號
     * @param {number} userId - 用戶 ID
     * @returns {Promise<Object>} - 更新後的用戶物件
     */
    async unlockUser(userId) {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('用戶不存在');
        }

        return await this.resetLoginAttempts(user);
    }
}

module.exports = new LoginAttemptService(); 