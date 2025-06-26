# 🚀 快速開始指南

## 使用管理工具

### 方法一：使用主引導腳本（推薦）

```bash
# 進入後端目錄
cd backend

# 使用 npm/yarn 執行主引導腳本
npm run admin
# 或
yarn admin

# 或直接執行
node admin-tools.js
```

### 方法二：使用 npm/yarn 腳本

```bash
# 創建管理員帳號
npm run create-admin

# 修改用戶密碼
npm run change-password

# 解鎖管理員帳號
npm run unlock-admin
```

### 方法三：直接執行腳本

```bash
# 創建管理員帳號
node scripts/create-admin.js

# 修改用戶密碼
node scripts/change-user-password.js

# 解鎖管理員帳號
node scripts/unlock-admin.js
```

## 📋 工具說明

| 工具 | 命令 | 功能 |
|------|------|------|
| 主引導腳本 | `npm run admin` | 顯示選單，選擇要執行的工具 |
| 創建管理員 | `npm run create-admin` | 創建新的管理員帳號 |
| 修改密碼 | `npm run change-password` | 修改指定用戶的密碼 |
| 解鎖帳號 | `npm run unlock-admin` | 解鎖被鎖定的管理員帳號 |

## 🎯 推薦使用流程

1. **首次使用**: 執行 `npm run admin` 查看所有可用工具
2. **創建管理員**: 如果沒有管理員帳號，使用 `npm run create-admin`
3. **日常管理**: 使用 `npm run admin` 進行各種管理操作

## ⚡ 快速命令

```bash
# 最常用的命令
npm run admin          # 啟動管理工具選單
npm run change-password # 快速修改密碼
```

## 📚 詳細文檔

- [完整說明文件](README-admin-tools.md)
- [密碼修改說明](README-password.md) 