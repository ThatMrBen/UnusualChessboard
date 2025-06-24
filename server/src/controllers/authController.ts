import { Request, Response } from 'express';
import User from '../models/User';
import VerificationCode from '../models/VerificationCode';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { generateBilingualEmail } from '../utils/i18n';

// 这个文件包含与用户认证相关的所有控制器函数
// 包括注册、登录、验证码发送、密码重置等功能

// 生成随机验证码
// 返回一个6位数的随机验证码
const generateVerificationCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// 发送验证码邮件
// 根据不同的类型发送不同内容的验证码邮件
// type可以是: registration, password-reset, two-factor, email-verification
const sendVerificationEmail = async (email: string, code: string, type: string): Promise<void> => {
  // 在生产环境中，应该使用环境变量配置邮件服务
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.example.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER || 'user@example.com',
      pass: process.env.EMAIL_PASS || 'password',
    },
  });

  // 使用i18n工具函数生成双语邮件内容
  const emailContent = generateBilingualEmail(type as any, code);

  await transporter.sendMail({
    from: emailContent.from,
    to: email,
    subject: emailContent.subject,
    text: emailContent.text,
  });
};

// 检查邮箱域名是否在允许列表中
// 只允许特定域名的邮箱注册，提高安全性
const isEmailDomainAllowed = (email: string): boolean => {
  const allowedDomains = [
    'gmail.com', 'outlook.com', 'hotmail.com', 'qq.com', 
    '163.com', '126.com', 'yahoo.com', 'icloud.com', 
    'mail.ru', 'aol.com', 'gmx.com', 'mail.com'
  ];
  
  const domain = email.split('@')[1].toLowerCase();
  return allowedDomains.includes(domain);
};

// 发送注册验证码
export const sendRegistrationCode = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ success: false, message: '邮箱是必需的' });
      return;
    }

    if (!isEmailDomainAllowed(email)) {
      res.status(400).json({ 
        success: false, 
        message: '不支持的邮箱域名，请使用支持的邮箱域名' 
      });
      return;
    }

    // 检查邮箱是否已注册
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ success: false, message: '此邮箱已注册' });
      return;
    }

    // 生成验证码
    const code = generateVerificationCode();

    // 保存验证码到数据库
    await VerificationCode.findOneAndUpdate(
      { email, type: 'registration' },
      { email, code, type: 'registration' },
      { upsert: true, new: true }
    );

    // 发送验证码邮件
    await sendVerificationEmail(email, code, 'registration');

    res.status(200).json({ success: true, message: '验证码已发送到您的邮箱' });
  } catch (error) {
    console.error('发送注册验证码错误:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
};

// 用户注册
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, code } = req.body;

    if (!name || !email || !password || !code) {
      res.status(400).json({ success: false, message: '所有字段都是必需的' });
      return;
    }

    if (!isEmailDomainAllowed(email)) {
      res.status(400).json({ 
        success: false, 
        message: '不支持的邮箱域名，请使用支持的邮箱域名' 
      });
      return;
    }

    // 验证验证码
    const verificationCode = await VerificationCode.findOne({
      email,
      code,
      type: 'registration',
      expiresAt: { $gt: new Date() },
    });

    if (!verificationCode) {
      res.status(400).json({ success: false, message: '验证码无效或已过期' });
      return;
    }

    // 创建用户
    const user = await User.create({
      name,
      email,
      password,
      gameData: {
        growthScore: 0,
        preferences: {},
        gameProgress: {},
        savedGames: {}
      },
      security: {
        twoFactorEnabled: false,
        apiAccessEnabled: false
      }
    });

    // 删除已使用的验证码
    await VerificationCode.deleteOne({ _id: verificationCode._id });

    // 生成JWT令牌
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'your-jwt-secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '30d' } as jwt.SignOptions
    );

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('注册错误:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
};

// 用户登录
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, message: '请提供邮箱和密码' });
      return;
    }

    // 查找用户并包含密码字段
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      res.status(401).json({ success: false, message: '邮箱或密码不正确' });
      return;
    }

    // 验证密码
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      res.status(401).json({ success: false, message: '邮箱或密码不正确' });
      return;
    }

    // 检查是否启用两步验证
    if (user.security.twoFactorEnabled) {
      // 生成两步验证码
      const twoFactorCode = generateVerificationCode();

      // 保存两步验证码
      await VerificationCode.findOneAndUpdate(
        { email, type: 'two-factor' },
        { email, code: twoFactorCode, type: 'two-factor' },
        { upsert: true, new: true }
      );

      // 发送两步验证码邮件
      await sendVerificationEmail(email, twoFactorCode, 'two-factor');

      res.status(200).json({
        success: true,
        message: '需要两步验证',
        requireTwoFactor: true,
        userId: user._id,
      });
      return;
    }

    // 生成JWT令牌
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'your-jwt-secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '30d' } as jwt.SignOptions
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('登录错误:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
};

// 验证两步验证码
export const verifyTwoFactor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      res.status(400).json({ success: false, message: '请提供邮箱和验证码' });
      return;
    }

    // 验证两步验证码
    const verificationCode = await VerificationCode.findOne({
      email,
      code,
      type: 'two-factor',
      expiresAt: { $gt: new Date() },
    });

    if (!verificationCode) {
      res.status(400).json({ success: false, message: '验证码无效或已过期' });
      return;
    }

    // 查找用户
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ success: false, message: '用户不存在' });
      return;
    }

    // 删除已使用的验证码
    await VerificationCode.deleteOne({ _id: verificationCode._id });

    // 生成JWT令牌
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'your-jwt-secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '30d' } as jwt.SignOptions
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('两步验证错误:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
};

// 发送密码重置验证码
export const sendPasswordResetCode = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ success: false, message: '邮箱是必需的' });
      return;
    }

    // 检查用户是否存在
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ success: false, message: '此邮箱未注册' });
      return;
    }

    // 生成验证码
    const code = generateVerificationCode();

    // 保存验证码到数据库
    await VerificationCode.findOneAndUpdate(
      { email, type: 'password-reset' },
      { email, code, type: 'password-reset' },
      { upsert: true, new: true }
    );

    // 发送验证码邮件
    await sendVerificationEmail(email, code, 'password-reset');

    res.status(200).json({ success: true, message: '密码重置验证码已发送到您的邮箱' });
  } catch (error) {
    console.error('发送密码重置验证码错误:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
};

// 重置密码
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, code, newPassword } = req.body;

    if (!email || !code || !newPassword) {
      res.status(400).json({ success: false, message: '所有字段都是必需的' });
      return;
    }

    // 验证验证码
    const verificationCode = await VerificationCode.findOne({
      email,
      code,
      type: 'password-reset',
      expiresAt: { $gt: new Date() },
    });

    if (!verificationCode) {
      res.status(400).json({ success: false, message: '验证码无效或已过期' });
      return;
    }

    // 查找用户
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ success: false, message: '用户不存在' });
      return;
    }

    // 更新密码
    user.password = newPassword;
    await user.save();

    // 删除已使用的验证码
    await VerificationCode.deleteOne({ _id: verificationCode._id });

    res.status(200).json({ success: true, message: '密码已成功重置' });
  } catch (error) {
    console.error('重置密码错误:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
}; 