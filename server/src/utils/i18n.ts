// 服务器端i18n工具函数
// 用于生成多语言邮件内容

// 英文邮件内容
const enEmailContent = {
  registration: {
    subject: "Welcome to UnusualChessboard - Verification Code",
    greeting: "Hello,",
    code_message: "Your registration verification code is:",
    expiry_message: "This verification code will expire in 15 minutes.",
    ignore_message: "If you did not request this verification code, please ignore this email.",
    thanks: "Thank you,",
    team: "*UnusualChessboard* Development Group"
  },
  'password-reset': {
    subject: "UnusualChessboard - Password Reset Verification Code",
    greeting: "Hello,",
    code_message: "Your password reset verification code is:",
    expiry_message: "This verification code will expire in 15 minutes.",
    ignore_message: "If you did not request this verification code, please ignore this email.",
    thanks: "Thank you,",
    team: "*UnusualChessboard* Development Group"
  },
  'two-factor': {
    subject: "UnusualChessboard - Two-Factor Authentication Code",
    greeting: "Hello,",
    code_message: "Your two-factor authentication code is:",
    expiry_message: "This verification code will expire in 15 minutes.",
    ignore_message: "If you did not request this verification code, please ignore this email.",
    thanks: "Thank you,",
    team: "*UnusualChessboard* Development Group"
  },
  'email-verification': {
    subject: "UnusualChessboard - Email Verification Code",
    greeting: "Hello,",
    code_message: "Your email verification code is:",
    expiry_message: "This verification code will expire in 15 minutes.",
    ignore_message: "If you did not request this verification code, please ignore this email.",
    thanks: "Thank you,",
    team: "*UnusualChessboard* Development Group"
  },
  general: {
    subject: "UnusualChessboard - Verification Code",
    greeting: "Hello,",
    code_message: "Your verification code is:",
    expiry_message: "This verification code will expire in 15 minutes.",
    ignore_message: "If you did not request this verification code, please ignore this email.",
    thanks: "Thank you,",
    team: "*UnusualChessboard* Development Group"
  }
};

// 中文邮件内容
const zhEmailContent = {
  registration: {
    subject: "欢迎注册这个棋盘不一般 - 验证码",
    greeting: "您好，",
    code_message: "您的注册验证码是：",
    expiry_message: "该验证码将在15分钟后过期。",
    ignore_message: "如果您没有请求此验证码，请忽略此邮件。",
    thanks: "谢谢，",
    team: "《这个棋盘不一般》开发团队"
  },
  'password-reset': {
    subject: "这个棋盘不一般 - 密码重置验证码",
    greeting: "您好，",
    code_message: "您的密码重置验证码是：",
    expiry_message: "该验证码将在15分钟后过期。",
    ignore_message: "如果您没有请求此验证码，请忽略此邮件。",
    thanks: "谢谢，",
    team: "《这个棋盘不一般》开发团队"
  },
  'two-factor': {
    subject: "这个棋盘不一般 - 两步验证码",
    greeting: "您好，",
    code_message: "您的两步验证码是：",
    expiry_message: "该验证码将在15分钟后过期。",
    ignore_message: "如果您没有请求此验证码，请忽略此邮件。",
    thanks: "谢谢，",
    team: "《这个棋盘不一般》开发团队"
  },
  'email-verification': {
    subject: "这个棋盘不一般 - 邮箱验证码",
    greeting: "您好，",
    code_message: "您的邮箱验证码是：",
    expiry_message: "该验证码将在15分钟后过期。",
    ignore_message: "如果您没有请求此验证码，请忽略此邮件。",
    thanks: "谢谢，",
    team: "《这个棋盘不一般》开发团队"
  },
  general: {
    subject: "这个棋盘不一般 - 验证码",
    greeting: "您好，",
    code_message: "您的验证码是：",
    expiry_message: "该验证码将在15分钟后过期。",
    ignore_message: "如果您没有请求此验证码，请忽略此邮件。",
    thanks: "谢谢，",
    team: "《这个棋盘不一般》开发团队"
  }
};

// 邮件类型
type EmailType = 'registration' | 'password-reset' | 'two-factor' | 'email-verification' | 'general';

// 生成双语邮件内容
// 英文优先级最高，先显示英文，再显示中文
export const generateBilingualEmail = (type: EmailType, code: string) => {
  const enContent = enEmailContent[type];
  const zhContent = zhEmailContent[type];
  
  // 构建英文内容
  const enText = `${enContent.greeting}\n\n${enContent.code_message} ${code}\n\n${enContent.expiry_message}\n\n${enContent.ignore_message}\n\n${enContent.thanks}\n${enContent.team}`;
  
  // 构建中文内容
  const zhText = `${zhContent.greeting}\n\n${zhContent.code_message}${code}\n\n${zhContent.expiry_message}\n\n${zhContent.ignore_message}\n\n${zhContent.thanks}\n${zhContent.team}`;
  
  // 组合双语内容，英文在上，中文在下
  const bilingualText = `${enText}\n\n---\n\n${zhText}`;
  
  return {
    subject: enContent.subject, // 使用英文主题
    text: bilingualText,
    from: `"${enContent.team}" <${process.env.EMAIL_USER || 'noreply@unusualchessboard.com'}>`
  };
};

// 根据语言偏好生成单语邮件内容
export const generateEmailByLanguage = (type: EmailType, code: string, language: 'en' | 'zh' = 'en') => {
  const content = language === 'zh' ? zhEmailContent[type] : enEmailContent[type];
  
  const text = language === 'zh' 
    ? `${content.greeting}\n\n${content.code_message}${code}\n\n${content.expiry_message}\n\n${content.ignore_message}\n\n${content.thanks}\n${content.team}`
    : `${content.greeting}\n\n${content.code_message} ${code}\n\n${content.expiry_message}\n\n${content.ignore_message}\n\n${content.thanks}\n${content.team}`;
  
  return {
    subject: content.subject,
    text,
    from: `"${content.team}" <${process.env.EMAIL_USER || 'noreply@unusualchessboard.com'}>`
  };
}; 