/**
 * 移动应用配置
 */

export const APP_CONFIG = {
  // 应用信息
  appName: 'UnusualChessboard',
  appVersion: '1.0.0',
  
  // API配置
  api: {
    baseUrl: 'https://api.unusualchessboard.com',
    timeout: 10000,
  },
  
  // 存储键
  storage: {
    user: 'uc_user',
    token: 'uc_token',
    settings: 'uc_settings',
    gameData: 'uc_game_data',
  },
  
  // 默认设置
  defaultSettings: {
    language: 'en',
    theme: 'light',
    sound: true,
    music: true,
    notifications: true,
  },
}; 