# 修改用戶密碼工具

這個工具允許管理員修改指定用戶的密碼。

## 功能特點

- 🔍 **用戶查找**: 支援按用戶ID或用戶名查找用戶
- 📋 **用戶列表**: 顯示所有現有用戶的列表
- 🔐 **密碼驗證**: 強制密碼強度要求
- ✅ **確認機制**: 多重確認防止誤操作
- 🛡️ **安全加密**: 使用 bcrypt 加密密碼

## 密碼要求

新密碼必須符合以下要求：
- 至少 8 個字符
- 最多 50 個字符
- 至少包含一個小寫字母
- 至少包含一個數字、符號或空白字符

## 使用方法

### 1. 進入後端目錄
```bash
cd backend
```

### 2. 執行腳本
```bash
node change-user-password.js
```

### 3. 按照提示操作

腳本會顯示以下步驟：

1. **顯示用戶列表**: 查看所有可用的用戶
2. **選擇用戶**: 輸入用戶ID或用戶名
3. **確認用戶**: 確認要修改的用戶信息
4. **輸入新密碼**: 輸入符合要求的新密碼
5. **確認密碼**: 再次輸入新密碼確認
6. **最終確認**: 確認修改操作
7. **完成**: 顯示修改結果

## 使用範例

```
🔧 修改用戶密碼工具
==================

✅ 資料庫連接成功

📋 現有用戶列表:
============================================================
1. ID: 1 | 用戶名: admin | 姓名: 系統管理員
   電子郵件: admin@example.com | 角色: admin

2. ID: 2 | 用戶名: operator1 | 姓名: 操作員1
   電子郵件: operator1@example.com | 角色: operator

請輸入用戶ID或用戶名: admin

✅ 找到用戶:
   ID: 1
   用戶名: admin
   姓名: 系統管理員
   電子郵件: admin@example.com
   角色: admin

是否要修改此用戶的密碼? (y/N): y
請輸入新密碼: NewPassword123!
請再次輸入新密碼確認: NewPassword123!

📋 請確認以下信息:
目標用戶: admin (系統管理員)
用戶ID: 1
角色: admin

是否確認修改此用戶的密碼? (y/N): y

🔄 正在修改密碼...
✅ 密碼修改成功!
📝 用戶: admin (系統管理員)
🆔 用戶ID: 1
👨‍💼 角色: admin

🔐 新密碼已生效，用戶可以使用新密碼登入
```

## 注意事項

1. **權限要求**: 只有管理員才能執行此腳本
2. **用戶狀態**: 只能修改 `isActive: true` 的用戶
3. **密碼安全**: 新密碼會立即生效，舊密碼無法使用
4. **備份建議**: 建議在修改前通知用戶
5. **錯誤處理**: 腳本包含完整的錯誤處理和驗證

## 錯誤處理

腳本會處理以下常見錯誤：
- 資料庫連接失敗
- 用戶不存在
- 密碼不符合要求
- 密碼確認不匹配
- 資料庫操作失敗

## 相關文件

- `create-admin.js` - 創建管理員帳號
- `unlock-admin.js` - 解鎖管理員帳號
- `src/controllers/authController.js` - 認證控制器
- `src/models/User.js` - 用戶模型 