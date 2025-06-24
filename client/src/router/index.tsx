import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import MainLayout from '../layouts/MainLayout';

// 懒加载组件
const HomePage = lazy(() => import('../pages/HomePage'));
const GamesPage = lazy(() => import('../pages/GamesPage'));
const GameDetailPage = lazy(() => import('../pages/GameDetailPage'));
const SettingsPage = lazy(() => import('../pages/SettingsPage'));

// 加载组件
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="loading loading-spinner loading-lg"></div>
  </div>
);

// 页面包装器，提供懒加载支持
const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingSpinner />}>
    {children}
  </Suspense>
);

/**
 * 应用路由配置
 * 使用懒加载优化性能
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <PageWrapper>
            <HomePage />
          </PageWrapper>
        )
      },
      {
        path: 'games',
        element: (
          <PageWrapper>
            <GamesPage />
          </PageWrapper>
        )
      },
      {
        path: 'games/:gameId',
        element: (
          <PageWrapper>
            <GameDetailPage />
          </PageWrapper>
        )
      },
      {
        path: 'settings',
        element: (
          <PageWrapper>
            <SettingsPage />
          </PageWrapper>
        )
      }
    ]
  }
]);

export default router; 