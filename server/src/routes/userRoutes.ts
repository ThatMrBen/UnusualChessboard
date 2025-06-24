import express from 'express';
import User from '../models/User';
import { Request, Response } from 'express';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

// 获取当前用户资料
router.get('/profile', protect, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ success: false, message: '用户不存在' });
      return;
    }
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      signature: user.signature,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// 更新当前用户资料
router.put('/profile', protect, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const { name, avatar, signature } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ success: false, message: '用户不存在' });
      return;
    }
    if (name !== undefined) user.name = name;
    if (avatar !== undefined) user.avatar = avatar;
    if (signature !== undefined) user.signature = signature;
    await user.save();
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      signature: user.signature,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

export default router; 