import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import GamesPage from '../pages/GamesPage';
import AboutPage from '../pages/AboutPage';
import GameDetailPage from '../pages/GameDetailPage';

/**
 * 应用路由配置
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'games',
        element: <GamesPage />
      },
      {
        path: 'games/:gameId',
        element: <GameDetailPage />
      },
      {
        path: 'about',
        element: <AboutPage />
      }
    ]
  }
]);

export default router; 