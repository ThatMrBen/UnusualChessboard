import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import gameService from '../services/gameService';

/**
 * 首页组件
 * 作为项目的入口页面，展示欢迎信息和推荐游戏
 */
const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const availableGames = gameService.getAvailableGames();
  
  return (
    <div className="flex flex-col items-center">
      {/* 欢迎区域 */}
      <div className="text-center max-w-4xl mx-auto py-12">
        <h1 className="text-5xl font-bold mb-6">{t('welcome')}</h1>
        <p className="text-xl mb-10">{t('welcome_message')}</p>
        <Link to="/games" className="btn btn-primary btn-lg">
          {t('get_started')}
        </Link>
      </div>
      
      {/* 特色游戏区域 */}
      <div className="w-full py-10">
        <h2 className="text-3xl font-bold mb-8 text-center">{t('games.available_games')}</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {availableGames.map((game) => (
            <Link 
              key={game.id}
              to={`/games/${game.id}`}
              className="card w-96 bg-base-100 shadow-xl hover:shadow-2xl transition-all"
            >
              <figure>
                <img 
                  src={game.image || `https://placehold.co/300x200/3D4451/FFFFFF?text=${encodeURIComponent(t(game.nameKey))}`} 
                  alt={t(game.nameKey)}
                  className="h-48 w-full object-cover" 
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{t(game.nameKey)}</h3>
                <p>{t(game.descriptionKey)}</p>
                <div className="card-actions justify-end">
                  <span className="badge badge-outline">{t(`games.categories.${game.category}`)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* 项目简介区域 */}
      <div className="bg-base-200 w-full py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">{t('app.title')}</h2>
          <p className="text-lg mb-8">{t('app.description')}</p>
          <div className="flex justify-center space-x-4">
            <Link to="/games" className="btn btn-primary">
              {t('app.start')}
            </Link>
            <Link to="/about" className="btn btn-outline">
              {t('nav.about')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 