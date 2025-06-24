import express from 'express';
import authRoutes from './authRoutes';
import gameDataRoutes from './gameDataRoutes';
import userRoutes from './userRoutes';

const router = express.Router();

// 健康检查
router.get('/health', (_req: express.Request, res: express.Response) => {
  res.status(200).json({ status: 'ok' });
});

// API版本
router.get('/version', (_req: express.Request, res: express.Response) => {
  res.status(200).json({ version: '1.0.0' });
});

router.use('/auth', authRoutes);
router.use('/game-data', gameDataRoutes);
router.use('/users', userRoutes);

export default router; 