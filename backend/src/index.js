require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const esimRoutes = require('./routes/esimRoutes');
const sequelize = require('./db');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const winston = require('winston');
const rateLimit = require('express-rate-limit');
const groupRoutes = require('./routes/groupRoutes');
const userRoutes = require('./routes/userRoutes');
const billingRoutes = require('./routes/billingRoutes');

// 設定 API 基礎 URL
// TODO : 圖片處理
process.env.API_BASE_URL = process.env.API_BASE_URL || `http://localhost:${process.env.PORT || 3030}`;

// Swagger 配置
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'eSIM API 文檔',
      version: '1.0.0',
      description: 'eSIM 服務的 API 文檔',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3030}`,
        description: '開發伺服器',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: '請輸入 JWT token，格式：Bearer <token>'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.js'], // API 路由文件的路徑
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// 配置日誌
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

const app = express();
const port = process.env.PORT || 3000;

// 設置處理尾部斜線
app.set('strict routing', false);

// 速率限制
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分鐘
  max: 10000 // 限制每個 IP 在 windowMs 內最多 10000 個請求
});

// 中間件
app.use(cors());
app.use(express.json());
app.use(limiter);

// 靜態檔案服務
// TODO : 圖片處理
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// 請求日誌中間件
app.use((req, res, next) => {
    logger.info('收到請求', {
        method: req.method,
        url: req.url,
        query: req.query,
        params: req.params,
        body: req.body,
        ip: req.ip
    });
    next();
});

// 路由
app.use('/api/auth', authRoutes);   // 認證相關路由
app.use('/api/esim', esimRoutes);
app.use('/api/products', productRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/users', userRoutes);
app.use('/api/billing', billingRoutes);

// 同步資料表
sequelize.sync({ force: false }).then(() => {
  logger.info('資料庫已同步');
}).catch(err => {
  logger.error('資料庫同步失敗', { error: err.message });
});


// 新增 store name API
app.get('/api/store-name', (req, res) => {
  const config = require('./config/config');
  res.json({ storeName: config.storeName });
});

// 404 處理
app.use((req, res, next) => {
  const err = new Error('找不到請求的資源');
  err.status = 404;
  next(err);
});

// 錯誤處理中間件
app.use((err, req, res, next) => {
    logger.error('錯誤', {
        error: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method
    });

    const status = err.status || 500;
    const message = status === 500 ? '系統錯誤' : err.message;

    res.status(status).json({
        status,
        message,
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// 優雅關閉
process.on('SIGTERM', () => {
  logger.info('收到 SIGTERM 信號，準備關閉伺服器');
  app.close(() => {
    logger.info('伺服器已關閉');
    process.exit(0);
  });
});

app.listen(port, () => {
    logger.info(`伺服器運行在 http://localhost:${port}`);
    logger.info(`Swagger 文檔可在 http://localhost:${port}/api-docs 查看`);
}); 