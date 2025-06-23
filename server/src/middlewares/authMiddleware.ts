import { Request as ExpressRequest, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import VerificationCode from '../models/VerificationCode';
import mongoose from 'mongoose';

// 扩展Request类型
interface AuthenticatedRequest extends ExpressRequest {
  user?: {
    id: string;
    role: string;
  };
}

// 验证JWT令牌
export const protect = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    let token;

    // 从请求头中获取令牌
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // 检查令牌是否存在
    if (!token) {
      res.status(401).json({ success: false, message: '未授权，请登录' });
      return;
    }

    try {
      // 验证令牌
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-jwt-secret') as { id: string };

      // 查找用户
      const user = await User.findById(decoded.id);
      if (!user) {
        res.status(401).json({ success: false, message: '此令牌的用户不存在' });
        return;
      }

      // 将用户信息添加到请求对象
      req.user = {
        id: user._id instanceof mongoose.Types.ObjectId 
          ? user._id.toString() 
          : typeof user._id === 'string' 
            ? user._id 
            : String(user._id),
        role: user.role,
      };

      next();
    } catch (error) {
      res.status(401).json({ success: false, message: '未授权，令牌无效' });
    }
  } catch (error) {
    console.error('认证中间件错误:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
};

// 限制角色访问
export const restrictTo = (...roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ success: false, message: '您没有权限执行此操作' });
      return;
    }

    next();
  };
};

// 验证API访问的两步验证
export const verifyApiAccess = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: '未授权，请登录' });
      return;
    }

    // 查找用户
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(401).json({ success: false, message: '用户不存在' });
      return;
    }

    // 检查是否启用API访问
    if (!user.security.apiAccessEnabled) {
      res.status(403).json({ success: false, message: 'API访问未启用，请在设置中启用' });
      return;
    }

    // 检查是否提供了验证码
    const { verificationCode } = req.body;
    if (!verificationCode) {
      res.status(400).json({ success: false, message: '需要两步验证码' });
      return;
    }

    // 验证两步验证码
    const validCode = await VerificationCode.findOne({
      email: user.email,
      code: verificationCode,
      type: 'two-factor',
      expiresAt: { $gt: new Date() },
    });

    if (!validCode) {
      res.status(401).json({ success: false, message: '验证码无效或已过期' });
      return;
    }

    // 删除已使用的验证码
    await VerificationCode.deleteOne({ _id: validCode._id });

    next();
  } catch (error) {
    console.error('API访问验证错误:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
}; 