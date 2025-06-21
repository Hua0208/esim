# TOTP Swagger 測試指南

## 概述
本指南說明如何在 Swagger UI 中測試 TOTP（雙因素認證）功能。

## 安全機制
為了防止未授權的 TOTP 驗證，系統實施了以下安全措施：
1. **會話 ID 驗證**：TOTP 驗證需要提供從登入流程中獲得的 sessionId
2. **臨時會話**：sessionId 是臨時生成的，有效期限制
3. **流程綁定**：TOTP 驗證必須與正確的登入流程綁定

## 訪問 Swagger UI
1. 啟動後端服務器：`npm start`
2. 打開瀏覽器訪問：`http://localhost:3030/api-docs`

## TOTP 測試流程

### 1. 獲取 TOTP 設置（首次設置）
**端點：** `GET /api/auth/totp/setup`

**步驟：**
1. 在 Swagger UI 中找到 "Authentication" 標籤
2. 找到 "獲取 TOTP 設置" API
3. 點擊 "Try it out"
4. 在 Authorization 欄位輸入 Bearer token（需要先登入獲取 token）
5. 點擊 "Execute"

**返回資料：**
```json
{
  "secret": "IFMHK6C2KRXUCLB7GU4SURBOKRJGQNJUJBZVWM3BOFACY6KVGJBQ",
  "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "backupCodes": ["ABCD123456", "EFGH789012", ...]
}
```

### 2. 啟用 TOTP
**端點：** `POST /api/auth/totp/enable`

**步驟：**
1. 使用驗證器應用程式（如 Google Authenticator）掃描 QR code
2. 輸入驗證器顯示的 6 位數代碼
3. 在 Swagger UI 中找到 "驗證並啟用 TOTP" API
4. 點擊 "Try it out"
5. 輸入：
   ```json
   {
     "secret": "IFMHK6C2KRXUCLB7GU4SURBOKRJGQNJUJBZVWM3BOFACY6KVGJBQ",
     "token": "123456"
   }
   ```
6. 點擊 "Execute"

### 3. 測試 TOTP 驗證（獲取 Token）
**端點：** `POST /api/auth/totp/verify`

**重要：** 此 API 需要先通過登入流程獲取 sessionId

**步驟：**
1. **首先進行登入**：使用 `POST /api/auth/login` 進行登入
   ```json
   {
     "username": "admin",
     "password": "admin"
   }
   ```
   
2. **獲取 sessionId**：如果用戶啟用了 TOTP，登入會返回：
   ```json
   {
     "requireTotp": true,
     "userId": 1,
     "sessionId": "a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234",
     "message": "需要 TOTP 驗證"
   }
   ```

3. **驗證 TOTP**：使用獲得的 sessionId 進行 TOTP 驗證
   ```json
   {
     "userId": 1,
     "token": "123456",
     "sessionId": "a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234"
   }
   ```

**成功返回：**
```json
{
  "user": {
    "id": 1,
    "username": "admin",
    "fullName": "Administrator",
    "email": "admin@example.com",
    "role": "admin",
    "avatar": null,
    "totpEnabled": true,
    "abilityRules": [
      {
        "action": "manage",
        "subject": "all"
      }
    ]
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 4. 測試備用代碼
**端點：** `POST /api/auth/totp/backup`

**步驟：**
1. 在 Swagger UI 中找到 "使用備用代碼並獲取登入 token" API
2. 點擊 "Try it out"
3. 輸入：
   ```json
   {
     "userId": 1,
     "backupCode": "ABCD123456"
   }
   ```
4. 點擊 "Execute"

**成功返回：**
```json
{
  "user": {
    "id": 1,
    "username": "admin",
    "fullName": "Administrator",
    "email": "admin@example.com",
    "role": "admin",
    "avatar": null,
    "totpEnabled": true,
    "abilityRules": [
      {
        "action": "manage",
        "subject": "all"
      }
    ]
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## 安全注意事項

1. **sessionId 有效期**：sessionId 是臨時生成的，應該在短時間內使用
2. **流程綁定**：TOTP 驗證必須與正確的登入流程綁定
3. **防止重放攻擊**：每個 sessionId 只能使用一次
4. **TOTP 代碼有效期**：每個 TOTP 代碼只有 30 秒有效期
5. **備用代碼一次性**：每個備用代碼只能使用一次
6. **用戶 ID**：需要知道正確的用戶 ID（admin 用戶通常是 1）
7. **時鐘同步**：確保驗證器應用程式的時間與伺服器時間同步

## 常見問題

### Q: TOTP 驗證失敗怎麼辦？
A: 
- 檢查驗證器應用程式的時間是否正確
- 確認輸入的 6 位數代碼是否正確
- 檢查用戶是否已啟用 TOTP
- 確認 sessionId 是否來自正確的登入流程

### Q: sessionId 無效怎麼辦？
A:
- 確認 sessionId 是否來自最近的登入流程
- 檢查 sessionId 格式是否正確（64 位十六進制字串）
- 重新進行登入流程獲取新的 sessionId

### Q: 備用代碼無效怎麼辦？
A:
- 確認備用代碼是否正確
- 檢查該備用代碼是否已被使用
- 重新生成備用代碼

### Q: 如何重新生成備用代碼？
A: 使用 `POST /api/auth/totp/regenerate-backup` API，需要提供用戶密碼。

## 測試建議

1. **先測試正常登入**：確保用戶帳號正常
2. **設置 TOTP**：使用 setup API 獲取 QR code
3. **啟用 TOTP**：使用 enable API 啟用雙因素認證
4. **測試完整登入流程**：使用 login API 獲取 sessionId
5. **測試 TOTP 驗證**：使用 verify API 獲取 token
6. **測試備用代碼**：使用 backup API 測試備用登入方式

## 安全測試

1. **測試無效 sessionId**：使用隨機的 sessionId 測試是否被拒絕
2. **測試過期 sessionId**：等待 sessionId 過期後測試
3. **測試重複使用**：嘗試重複使用同一個 sessionId
4. **測試未授權訪問**：不經過登入流程直接調用 TOTP 驗證 