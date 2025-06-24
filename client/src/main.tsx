import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './i18n/i18n';
import './styles/index.css';
import router from './router';

/**
 * 应用入口
 * 提供国际化和路由支持
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// 全局主题初始化：页面加载时自动应用localStorage中保存的主题
const theme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', theme); 