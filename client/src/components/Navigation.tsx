import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/**
 * 导航组件
 * 用于主布局中的主要导航链接
 */
// Navigation 组件，负责渲染主导航栏
const Navigation: React.FC = () => {
  const { t } = useTranslation();

  // 导航链接配置，包含路由路径和国际化key
  const navLinks = [
    { to: '/', label: 'nav.home' },
    { to: '/games', label: 'nav.games' }
  ];

  return (
    <div className="flex-1 px-2 lg:flex lg:justify-center">
      <div className="flex items-stretch">
        {/* 遍历渲染所有导航链接 */}
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `btn btn-ghost btn-md rounded-btn ${isActive ? 'btn-active' : ''}`
            }
            end={link.to === '/'} // 首页路由精确匹配
          >
            {t(link.label)}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Navigation; 