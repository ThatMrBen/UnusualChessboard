import express from 'express';
import * as gameDataController from '../controllers/gameDataController';
import { protect, verifyApiAccess } from '../middlewares/authMiddleware';

const router = express.Router();

// 所有路由都需要认证
router.use(protect);

// 基本游戏数据路由
router.get('/', gameDataController.getAllGameData);
router.get('/:gameType', gameDataController.getGameDataByType);
router.put('/:gameType', gameDataController.updateGameData);
router.delete('/:gameType', gameDataController.deleteGameData);

// 成长分数路由
router.post('/growth-score', gameDataController.updateGrowthScore);

// API访问路由（需要两步验证）
router.use('/api', verifyApiAccess);
router.get('/api/:gameType', gameDataController.getGameDataByType);
router.put('/api/:gameType', gameDataController.updateGameData);

export default router; 