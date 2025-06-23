/**
 * Express类型扩展定义
 * 
 * 注意：不推荐通过import直接导入此文件
 * 而是在需要的地方直接扩展Request接口
 */

import { Express } from 'express';
import { IUser } from '../models/User';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}

export {}; // 确保这个文件被视为模块 