import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import routes from './routes';
import errorHandler from './middlewares/errorHandler';
import mockDataService from './services/mockDataService';

// 加载环境变量
dotenv.config();

// 创建Express应用
const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 路由
app.get('/', (_req: Request, res: Response) => {
  res.send('UnusualChessboard API is running');
});

// API路由
app.use('/api', routes);

// 全局变量，表示数据库连接状态
let dbConnected = false;

// 连接MongoDB
const connectDB = async () => {
  try {
    const isDev = process.env.NODE_ENV !== 'production';
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/unusualchessboard');
    console.log('MongoDB连接成功');
    dbConnected = true;
    return true;
  } catch (error) {
    console.error('MongoDB连接失败:', error);
    if (process.env.NODE_ENV === 'production') {
      console.error('生产环境下需要有效的数据库连接，应用将退出');
      process.exit(1);
    }
    console.warn('开发环境：继续运行应用，但数据库功能将不可用');
    console.warn('请确保MongoDB服务已启动或配置正确的MONGODB_URI环境变量');
    console.warn('提示：您可以使用MongoDB Atlas免费云服务作为替代');
    dbConnected = false;
    
    // 在开发环境中初始化mock数据
    if (process.env.NODE_ENV !== 'production') {
      console.log('初始化mock数据以支持开发...');
      mockDataService.initializeMockData();
    }
    
    return false;
  }
};

// 导出数据库连接状态检查函数，供其他模块使用
export const isDbConnected = () => dbConnected;

// 异步启动应用
const startServer = async () => {
  const dbConnected = await connectDB();
  
  // 在生产环境中，从client目录提供静态文件
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../client/dist')));
    
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, '../../client/dist', 'index.html'));
    });
  }

  // 错误处理中间件
  app.use(errorHandler);

  // 启动服务器
  app.listen(PORT, () => {
    console.log(`服务器运行在端口 ${PORT}`);
    if (!dbConnected) {
      console.log('警告：应用以有限功能模式运行，数据库操作将使用模拟数据');
    }
  });
};

startServer(); 