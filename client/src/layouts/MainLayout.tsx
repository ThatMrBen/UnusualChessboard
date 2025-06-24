import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navigation from '../components/Navigation';
import * as React from 'react';

// DaisyUI官方35个主题
const DAISYUI_THEMES = [
  'light', 'dark', 'cupcake', 'bumblebee', 'emerald',
  'corporate', 'synthwave', 'retro', 'cyberpunk', 'valentine',
  'halloween', 'garden', 'forest', 'aqua', 'lofi',
  'pastel', 'fantasy', 'wireframe', 'black', 'luxury',
  'dracula', 'cmyk', 'autumn', 'business', 'acid',
  'lemonade', 'night', 'coffee', 'winter', 'dim',
  'nord', 'sunset', 'caramellatte', 'abyss', 'silk'
];

/**
 * 主布局组件
 * 负责页面整体结构（头部、导航、内容、页脚）
 */
const MainLayout: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isSettingsPage = location.pathname.startsWith('/settings');

  // 动态添加/删除CSS类，以改变特定页面的滚动行为
  const layoutClasses = isSettingsPage ? 'flex flex-col h-screen' : 'flex flex-col min-h-screen';
  const mainClasses = isSettingsPage ? 'flex-grow flex-1 container mx-auto px-4 py-8 w-full overflow-hidden' : 'flex-grow container mx-auto px-4 py-8';

  return (
    <div className={layoutClasses}>
      {/* 隐藏div，强制tailwindcss生成所有主题样式 */}
      <div style={{ display: 'none' }}>
        {DAISYUI_THEMES.map(theme => (
          <div key={theme} data-theme={theme} className={`theme-${theme}`}></div>
        ))}
      </div>

      {/* 页头 */}
      <header className="navbar bg-base-100 shadow-md z-10">
        <div className="container mx-auto flex flex-col lg:flex-row">
          <div className="flex-1">
            <a href="/" className="btn btn-ghost normal-case text-xl">
              {t('app_name')}
            </a>
          </div>
          {/* 导航菜单 */}
          <Navigation />
          {/* 头像下拉菜单 */}
          <div className="flex-none flex items-center">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="/default-avatar.png" alt="User" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a href="/settings">{t('setting')}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* 主体内容区 */}
      <main className={mainClasses}>
        <Outlet />
      </main>

      {/* 页脚 */}
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <div>
          <p>
            {i18n.language === 'zh' ? (
              <>Copyright © 2025 这个棋盘不一般 《这个棋盘不一般》开发团队</>
            ) : (
              <>Copyright © 2025 <em>UnusualChessboard</em> Development Group</>
            )}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout; 