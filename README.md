# Mobimatter API Integration

這是一個全端應用程式，包含後端 API 和前端介面。

## 專案結構

```
esim/
├── backend/          # 後端 API 服務
│   ├── src/         # 後端原始碼
│   │   ├── controllers/  # 控制器
│   │   ├── models/       # 資料模型
│   │   ├── routes/       # 路由定義
│   │   ├── services/     # 服務層
│   │   ├── utils/        # 工具函數
│   │   └── index.js      # 主入口檔案
│   ├── migrations/  # 資料庫遷移檔案
│   ├── config/      # 設定檔案
│   ├── seeders/     # 資料庫種子檔案
│   ├── db.sqlite    # SQLite 資料庫
│   └── package.json # 後端依賴
├── frontend/        # 前端應用程式
│   ├── pages/       # 頁面組件
│   ├── components/  # Vue 組件
│   ├── layouts/     # 佈局組件
│   ├── plugins/     # Nuxt 插件
│   ├── public/      # 靜態檔案
│   ├── server/      # 服務端 API
│   └── package.json # 前端依賴
└── package.json     # 根目錄管理腳本
```

## 快速開始

### 1. 安裝所有依賴
```bash
# 安裝根目錄依賴
npm install

# 安裝後端依賴
cd backend && npm install

# 安裝前端依賴
cd frontend && npm install

# 或者一次性安裝所有依賴
npm run install:all
```

### 2. 環境設定
在 `backend/` 目錄中建立 `.env` 檔案：
```env
API_KEY=your_api_key
MERCHANT_ID=your_merchant_id
BASEURL=https://api.mobimatter.com/mobimatter/api
API_VERSION=v2
STORE_NAME=your_store_name
```

### 3. 資料庫初始化
```bash
# 執行資料庫遷移
npm run migrate

# 如果需要回滾遷移
npm run migrate:undo
```

## 開發指令

### 開發模式
```bash
# 同時啟動後端和前端
npm run dev

# 分別啟動
npm run dev:backend   # 後端 (http://localhost:3000)
npm run dev:frontend  # 前端 (http://localhost:3001)
```

### 程式碼檢查
```bash
# 檢查所有程式碼
npm run lint

# 分別檢查
npm run lint:backend  # 檢查後端程式碼
npm run lint:frontend # 檢查前端程式碼
```

### 生產模式
```bash
# 建置前端
npm run build

# 啟動生產環境
npm run start:backend
npm run start:frontend
```

## 後端 API

- **API 文檔**: http://localhost:3000/api-docs
- **主要端點**: http://localhost:3000/api

### 主要功能
- 用戶管理 (`/api/users`)
- 訂單管理 (`/api/orders`)
- eSIM 購買和儲值 (`/api/esim`)
- 產品管理 (`/api/products`)
- 群組管理 (`/api/groups`)
- 帳單管理 (`/api/billing`)

### 認證
- 登入端點: `POST /api/auth/login`
- 支援帳號: `admin/admin`, `client/client`

## 前端應用

- **開發伺服器**: http://localhost:3001
- **技術棧**: Nuxt.js + Vue.js + Vuetify

### 主要功能
- 用戶管理介面
- 訂單管理介面
- eSIM 操作介面
- 產品管理介面
- 群組管理介面

## 開發指南

### 後端開發
```bash
cd backend
npm run dev
```

### 前端開發
```bash
cd frontend
npm run dev
```

### 資料庫開發
```bash
cd backend
npm run migrate
```

### 新增遷移檔案
```bash
cd backend
npx sequelize-cli migration:generate --name your-migration-name
```

## 常見問題

### 端口衝突
如果遇到端口衝突，可以修改：
- 後端端口：編輯 `backend/src/index.js`
- 前端端口：編輯 `frontend/nuxt.config.ts`

### 資料庫問題
```bash
# 重置資料庫
rm backend/db.sqlite
npm run migrate
```

### 依賴問題
```bash
# 清除並重新安裝依賴
rm -rf node_modules backend/node_modules frontend/node_modules
npm run install:all
```

## 部署

### 後端部署
```bash
cd backend
npm install --production
npm start
```

### 前端部署
```bash
cd frontend
npm run build
npm run preview
```

## 技術棧

### 後端
- Node.js + Express
- Sequelize ORM
- SQLite 資料庫
- Swagger API 文檔
- Winston 日誌

### 前端
- Nuxt.js 3
- Vue.js 3
- Vuetify 3
- TypeScript
- Pinia 狀態管理 