import { Request as ExpressRequest, Response } from 'express';
import GameData from '../models/GameData';
import User from '../models/User';
import mongoose from 'mongoose';

// 扩展Request类型
interface AuthenticatedRequest extends ExpressRequest {
  user?: {
    id: string;
    role: string;
  };
}

// 这个文件包含与游戏数据相关的所有控制器函数
// 用于处理游戏进度、成长分数等数据的存储和检索

// 获取用户的所有游戏数据
// 返回当前登录用户的所有游戏数据记录
export const getAllGameData = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      res.status(401).json({ success: false, message: '未授权' });
      return;
    }

    const gameData = await GameData.find({ userId });

    res.status(200).json({ success: true, data: gameData });
  } catch (error) {
    console.error('获取游戏数据错误:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
};

// 获取特定游戏类型的数据
export const getGameDataByType = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { gameType } = req.params;
    
    if (!userId) {
      res.status(401).json({ success: false, message: '未授权' });
      return;
    }

    const gameData = await GameData.findOne({ userId, gameType });

    if (!gameData) {
      res.status(404).json({ success: false, message: '未找到游戏数据' });
      return;
    }

    res.status(200).json({ success: true, data: gameData });
  } catch (error) {
    console.error('获取游戏数据错误:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
};

// 更新或创建游戏数据
export const updateGameData = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { gameType } = req.params;
    const { data } = req.body;
    
    if (!userId) {
      res.status(401).json({ success: false, message: '未授权' });
      return;
    }

    if (!gameType || !data) {
      res.status(400).json({ success: false, message: '游戏类型和数据是必需的' });
      return;
    }

    const gameData = await GameData.findOneAndUpdate(
      { userId, gameType },
      { 
        userId, 
        gameType, 
        data, 
        lastUpdated: new Date() 
      },
      { upsert: true, new: true }
    );

    res.status(200).json({ success: true, data: gameData });
  } catch (error) {
    console.error('更新游戏数据错误:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
};

// 更新用户的成长分数
// 只有在玩家对战AI模式下才会更新成长分数
// 这确保了公平的成长分数系统
export const updateGrowthScore = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { score, gameType } = req.body;
    
    if (!userId) {
      res.status(401).json({ success: false, message: '未授权' });
      return;
    }

    if (typeof score !== 'number') {
      res.status(400).json({ success: false, message: '分数必须是数字' });
      return;
    }

    // 只有在玩家对战AI模式下才更新成长分数
    if (req.body.gameMode !== 'player-vs-ai') {
      res.status(400).json({ success: false, message: '只有玩家对战AI模式才能更新成长分数' });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ success: false, message: '用户不存在' });
      return;
    }

    // 更新用户的成长分数
    user.gameData.growthScore += score;
    await user.save();

    // 记录游戏数据
    await GameData.findOneAndUpdate(
      { userId, gameType },
      { 
        $push: { 
          'data.history': { 
            score, 
            timestamp: new Date(),
            gameMode: 'player-vs-ai'
          } 
        },
        lastUpdated: new Date()
      },
      { upsert: true }
    );

    res.status(200).json({ 
      success: true, 
      currentScore: user.gameData.growthScore,
      addedScore: score
    });
  } catch (error) {
    console.error('更新成长分数错误:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
};

// 删除游戏数据
export const deleteGameData = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { gameType } = req.params;
    
    if (!userId) {
      res.status(401).json({ success: false, message: '未授权' });
      return;
    }

    const result = await GameData.deleteOne({ userId, gameType });

    if (result.deletedCount === 0) {
      res.status(404).json({ success: false, message: '未找到游戏数据' });
      return;
    }

    res.status(200).json({ success: true, message: '游戏数据已删除' });
  } catch (error) {
    console.error('删除游戏数据错误:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
}; 