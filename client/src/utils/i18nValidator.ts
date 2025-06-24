// i18n配置验证工具
// 检查翻译文件的完整性和一致性

import enTranslation from '../i18n/locales/en.json';
import zhTranslation from '../i18n/locales/zh.json';

// 翻译键类型
type TranslationKey = string;

// 验证结果接口
interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  missingKeys: {
    en: TranslationKey[];
    zh: TranslationKey[];
  };
  extraKeys: {
    en: TranslationKey[];
    zh: TranslationKey[];
  };
}

// 递归获取所有翻译键
const getAllKeys = (obj: Record<string, any>, prefix = ''): TranslationKey[] => {
  const keys: TranslationKey[] = [];
  
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof value === 'object' && value !== null) {
      keys.push(...getAllKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  
  return keys;
};

// 获取嵌套对象的值
const getNestedValue = (obj: Record<string, any>, path: string): any => {
  return path.split('.').reduce((current, key) => {
    return current && typeof current === 'object' ? current[key] : undefined;
  }, obj);
};

// 验证翻译文件
export const validateTranslations = (): ValidationResult => {
  const result: ValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
    missingKeys: { en: [], zh: [] },
    extraKeys: { en: [], zh: [] }
  };

  // 获取所有翻译键
  const enKeys = getAllKeys(enTranslation);
  const zhKeys = getAllKeys(zhTranslation);

  // 检查缺失的键
  const missingInZh = enKeys.filter(key => !zhKeys.includes(key));
  const missingInEn = zhKeys.filter(key => !enKeys.includes(key));

  if (missingInZh.length > 0) {
    result.errors.push(`中文翻译缺失以下键: ${missingInZh.join(', ')}`);
    result.missingKeys.zh = missingInZh;
    result.isValid = false;
  }

  if (missingInEn.length > 0) {
    result.errors.push(`英文翻译缺失以下键: ${missingInEn.join(', ')}`);
    result.missingKeys.en = missingInEn;
    result.isValid = false;
  }

  // 检查空值或无效值
  const checkEmptyValues = (translation: Record<string, any>, language: 'en' | 'zh') => {
    const keys = getAllKeys(translation);
    const emptyKeys: TranslationKey[] = [];

    keys.forEach(key => {
      const value = getNestedValue(translation, key);
      if (value === '' || value === null || value === undefined) {
        emptyKeys.push(key);
      }
    });

    if (emptyKeys.length > 0) {
      result.warnings.push(`${language === 'en' ? '英文' : '中文'}翻译存在空值: ${emptyKeys.join(', ')}`);
    }
  };

  checkEmptyValues(enTranslation, 'en');
  checkEmptyValues(zhTranslation, 'zh');

  // 检查团队署名一致性
  const checkTeamSignature = () => {
    const enAuthor = enTranslation.author;
    const zhAuthor = zhTranslation.author;
    
    if (enAuthor !== '*UnusualChessboard* Development Group') {
      result.errors.push('英文团队署名格式不正确');
      result.isValid = false;
    }
    
    if (zhAuthor !== '《这个棋盘不一般》开发团队') {
      result.errors.push('中文团队署名格式不正确');
      result.isValid = false;
    }
  };

  checkTeamSignature();

  return result;
};

// 生成翻译报告
export const generateTranslationReport = (): string => {
  const validation = validateTranslations();
  
  let report = '=== i18n翻译文件验证报告 ===\n\n';
  
  if (validation.isValid) {
    report += '✅ 翻译文件验证通过\n\n';
  } else {
    report += '❌ 翻译文件验证失败\n\n';
  }
  
  if (validation.errors.length > 0) {
    report += '错误:\n';
    validation.errors.forEach(error => {
      report += `  ❌ ${error}\n`;
    });
    report += '\n';
  }
  
  if (validation.warnings.length > 0) {
    report += '警告:\n';
    validation.warnings.forEach(warning => {
      report += `  ⚠️ ${warning}\n`;
    });
    report += '\n';
  }
  
  if (validation.missingKeys.en.length > 0 || validation.missingKeys.zh.length > 0) {
    report += '缺失的翻译键:\n';
    if (validation.missingKeys.en.length > 0) {
      report += `  英文: ${validation.missingKeys.en.join(', ')}\n`;
    }
    if (validation.missingKeys.zh.length > 0) {
      report += `  中文: ${validation.missingKeys.zh.join(', ')}\n`;
    }
    report += '\n';
  }
  
  return report;
};

// 开发环境下的自动验证
if (process.env.NODE_ENV === 'development') {
  const validation = validateTranslations();
  if (!validation.isValid) {
    console.warn('i18n翻译文件验证失败:', validation.errors);
  }
  if (validation.warnings.length > 0) {
    console.warn('i18n翻译文件警告:', validation.warnings);
  }
}
