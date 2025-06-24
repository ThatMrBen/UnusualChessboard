import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en.json';
import zhTranslation from './locales/zh.json';

// 获取用户语言偏好
const getUserLanguage = (): string => {
  // 1. 优先使用localStorage中保存的语言设置
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage && ['en', 'zh'].includes(savedLanguage)) {
    return savedLanguage;
  }
  
  // 2. 使用浏览器语言设置
  const browserLanguage = navigator.language.toLowerCase();
  if (browserLanguage.startsWith('zh')) {
    return 'zh';
  }
  
  // 3. 默认使用英文
  return 'en';
};

// 初始化i18n配置
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      zh: {
        translation: zhTranslation,
      },
    },
    lng: getUserLanguage(), // 使用用户语言偏好
    fallbackLng: 'en', // 英文作为后备语言
    interpolation: {
      escapeValue: false, // React已经处理XSS
    },
    // 调试配置（开发环境）
    debug: process.env.NODE_ENV === 'development',
    // 语言检测配置
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

// 语言切换时自动保存到localStorage
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n; 