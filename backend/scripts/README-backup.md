# SQLite 資料庫備份工具

這是一個用於備份 SQLite 資料庫的 Node.js 腳本工具。

## 功能特色

- 🔄 **自動備份**：一鍵備份 SQLite 資料庫
- 📅 **時間戳記**：備份檔案包含建立時間
- 🧹 **自動清理**：自動保留最新的 10 個備份檔案
- 📋 **備份列表**：查看所有備份檔案
- 🛡️ **錯誤處理**：完整的錯誤處理和提示

## 安裝與使用

### 1. 確保腳本可執行

```bash
chmod +x scripts/backup-database.js
```

### 2. 基本使用

```bash
# 執行備份 (預設命令)
node scripts/backup-database.js

# 或明確指定備份命令
node scripts/backup-database.js backup
```

### 3. 查看備份列表

```bash
node scripts/backup-database.js list
```

### 4. 清理舊備份

```bash
node scripts/backup-database.js clean
```

### 5. 查看說明

```bash
node scripts/backup-database.js help
```

## 配置設定

腳本中的配置可以在 `backup-database.js` 檔案頂部修改：

```javascript
const config = {
  // 資料庫檔案路徑
  dbPath: path.join(__dirname, '..', 'db.sqlite'),
  // 備份目錄
  backupDir: path.join(__dirname, '..', 'backups'),
  // 備份檔案名稱格式
  backupNameFormat: 'backup_%Y%m%d_%H%M%S.sqlite',
  // 保留備份檔案數量
  maxBackups: 10
};
```

### 配置說明

- **dbPath**: 資料庫檔案的路徑
- **backupDir**: 備份檔案的儲存目錄
- **backupNameFormat**: 備份檔案名稱格式
  - `%Y`: 年份 (4位數)
  - `%m`: 月份 (2位數)
  - `%d`: 日期 (2位數)
  - `%H`: 小時 (2位數)
  - `%M`: 分鐘 (2位數)
  - `%S`: 秒數 (2位數)
- **maxBackups**: 保留的備份檔案數量上限

## 備份檔案格式

備份檔案會以以下格式命名：
```
backup_20241217_143052.sqlite
```

其中：
- `20241217`: 日期 (YYYYMMDD)
- `143052`: 時間 (HHMMSS)

## 目錄結構

執行備份後，會建立以下目錄結構：

```
backend/
├── db.sqlite              # 原始資料庫檔案
├── backups/               # 備份目錄
│   ├── backup_20241217_143052.sqlite
│   ├── backup_20241217_150123.sqlite
│   └── ...
└── scripts/
    └── backup-database.js # 備份腳本
```

## 自動化備份

### 使用 cron 排程備份

1. 編輯 crontab：
```bash
crontab -e
```

2. 新增排程任務：
```bash
# 每天凌晨 2 點執行備份
0 2 * * * cd /path/to/your/project/backend && node scripts/backup-database.js >> logs/backup.log 2>&1

# 每小時執行備份
0 * * * * cd /path/to/your/project/backend && node scripts/backup-database.js >> logs/backup.log 2>&1
```

### 使用 systemd timer (Linux)

1. 建立服務檔案 `/etc/systemd/system/db-backup.service`：
```ini
[Unit]
Description=Database Backup Service
After=network.target

[Service]
Type=oneshot
User=your-user
WorkingDirectory=/path/to/your/project/backend
ExecStart=/usr/bin/node scripts/backup-database.js
```

2. 建立 timer 檔案 `/etc/systemd/system/db-backup.timer`：
```ini
[Unit]
Description=Run database backup daily
Requires=db-backup.service

[Timer]
OnCalendar=daily
Persistent=true

[Install]
WantedBy=timers.target
```

3. 啟用並啟動 timer：
```bash
sudo systemctl enable db-backup.timer
sudo systemctl start db-backup.timer
```

## 還原資料庫

如果需要還原資料庫，可以手動複製備份檔案：

```bash
# 停止應用程式
# ...

# 複製備份檔案
cp backups/backup_20241217_143052.sqlite db.sqlite

# 重新啟動應用程式
# ...
```

## 注意事項

1. **備份前停止應用程式**：建議在備份前停止使用資料庫的應用程式，以確保資料一致性
2. **定期測試還原**：定期測試備份檔案的還原功能
3. **監控磁碟空間**：定期檢查備份目錄的磁碟空間使用情況
4. **異地備份**：考慮將重要備份檔案複製到其他位置

## 故障排除

### 常見問題

1. **權限錯誤**
   ```bash
   # 確保腳本有執行權限
   chmod +x scripts/backup-database.js
   ```

2. **找不到資料庫檔案**
   - 檢查 `dbPath` 配置是否正確
   - 確認資料庫檔案存在

3. **備份目錄無法建立**
   - 檢查目錄權限
   - 確認磁碟空間充足

### 日誌記錄

腳本會輸出詳細的執行日誌，包括：
- 備份開始和完成時間
- 檔案大小資訊
- 錯誤訊息
- 清理操作記錄

## 版本資訊

- 版本：1.0.0
- 建立日期：2024-12-17
- 支援的資料庫：SQLite 