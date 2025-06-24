import React, { useState } from 'react';
import ThemeSelector from '../components/ThemeSelector';
import ProfileEditor from '../components/ProfileEditor';
import { useTranslation } from 'react-i18next';
import AccountSettings from '../components/AccountSettings';

/**
 * 设置页面
 * 左侧为侧边栏（头像、昵称、签名、菜单），右侧为详细设置内容
 */
// 菜单项配置，包含key和国际化label
const menuList = [
  { key: 'profile', label: 'settings.profile' },
  { key: 'account', label: 'settings.account' },
  { key: 'theme', label: 'settings.theme' },
  { key: 'language', label: 'settings.language' },
  { key: 'api', label: 'settings.api' },
];

// SettingsPage 组件，负责渲染设置页面
const SettingsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [activeMenu, setActiveMenu] = useState('profile');

  // 切换语言
  const handleLanguageChange = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <div className="flex flex-1 min-h-0 h-full">
      {/* 左侧栏，固定不滚动 */}
      <aside className="w-56 bg-base-100 border-r flex flex-col items-center py-6 px-2">
        <ProfileEditor simpleMode />
        <div className="divider my-2" />
        <nav className="w-full flex-grow">
          {menuList.map((item) => (
            <button
              key={item.key}
              className={`btn btn-block mb-2 ${activeMenu === item.key ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setActiveMenu(item.key)}
            >
              {t(item.label)}
            </button>
          ))}
        </nav>
      </aside>
      {/* 右侧内容区，可滚动 */}
      <section className="flex-1 min-w-0 p-6 overflow-y-auto">
        {activeMenu === 'profile' && <ProfileEditor />}
        {activeMenu === 'account' && <AccountSettings />}
        {activeMenu === 'theme' && (
          <>
            <h2 className="text-2xl font-bold mb-4">{t('theme_switcher')}</h2>
            <p className="mb-6 text-base-content/70">{t('theme_switcher_desc')}</p>
            <ThemeSelector />
          </>
        )}
        {activeMenu === 'language' && (
          <div className="flex items-center gap-4">
            <span>{t('settings.language')}</span>
            <button className="btn btn-outline" onClick={handleLanguageChange}>
              {i18n.language === 'en' ? t('language.chinese') : t('language.english')}
            </button>
          </div>
        )}
        {activeMenu === 'api' && (
          <div>
            <h2 className="text-xl font-bold mb-4">{t('api_settings.title')}</h2>
            <p>{t('api_settings.description')}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default SettingsPage; 