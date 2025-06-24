// 客户端i18n工具函数
// 提供更好的类型支持和常用功能

import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

// 支持的语言类型
export type SupportedLanguage = 'en' | 'zh';

// 语言配置
export const LANGUAGES = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸'
  },
  zh: {
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文',
    flag: '🇨🇳'
  }
} as const;

// 获取当前语言
export const getCurrentLanguage = (): SupportedLanguage => {
  return i18n.language as SupportedLanguage;
};

// 切换语言
export const changeLanguage = (language: SupportedLanguage): Promise<any> => {
  return i18n.changeLanguage(language);
};

// 获取语言显示名称
export const getLanguageDisplayName = (language: SupportedLanguage, useNativeName = true): string => {
  const lang = LANGUAGES[language];
  return useNativeName ? lang.nativeName : lang.name;
};

// 检查是否为RTL语言（从右到左）
export const isRTL = (_language: SupportedLanguage): boolean => {
  // 目前支持的语言都不是RTL
  return false;
};

// 获取数字格式化选项
export const getNumberFormatOptions = (_language: SupportedLanguage): Intl.NumberFormatOptions => {
  return {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  };
};

// 格式化数字
export const formatNumber = (value: number, language: SupportedLanguage): string => {
  const options = getNumberFormatOptions(language);
  return new Intl.NumberFormat(language, options).format(value);
};

// 获取日期格式化选项
export const getDateFormatOptions = (_language: SupportedLanguage): Intl.DateTimeFormatOptions => {
  return {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
};

// 格式化日期
export const formatDate = (date: Date, language: SupportedLanguage): string => {
  const options = getDateFormatOptions(language);
  return new Intl.DateTimeFormat(language, options).format(date);
};

// 自定义hook，提供增强的翻译功能
export const useI18n = () => {
  const { t, i18n } = useTranslation();
  
  return {
    t,
    i18n,
    currentLanguage: getCurrentLanguage(),
    changeLanguage: (lang: SupportedLanguage) => changeLanguage(lang),
    getLanguageDisplayName: (lang: SupportedLanguage, useNativeName = true) => 
      getLanguageDisplayName(lang, useNativeName),
    formatNumber: (value: number) => formatNumber(value, getCurrentLanguage()),
    formatDate: (date: Date) => formatDate(date, getCurrentLanguage()),
    isRTL: () => isRTL(getCurrentLanguage()),
  };
};

// 导出语言常量
export { LANGUAGES as SUPPORTED_LANGUAGES }; 