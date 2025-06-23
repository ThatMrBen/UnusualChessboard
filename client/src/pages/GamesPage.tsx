import React from 'react';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';
import CategoryHeader from '../components/CategoryHeader';
import GameCard from '../components/GameCard';
import gameService, { Game } from '../services/gameService';

/**
 * 游戏列表页面
 * 显示所有游戏分类和游戏卡片
 */
const GamesPage: React.FC = () => {
  const { t } = useTranslation();
  const categories = gameService.getCategories();
  const allGames = gameService.getAllGames();
  
  return (
    <div>
      <PageHeader 
        title={t('games.title')} 
        subtitle={t('games.subtitle')}
      />
      
      {/* 可用游戏展示区域 */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t('games.available_games')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allGames
            .filter(game => game.available)
            .map(game => (
              <GameCard
                key={game.id}
                id={game.id}
                name={t(game.nameKey)}
                description={t(game.descriptionKey)}
                image={game.image}
                category={t(`games.categories.${game.category}`)}
              />
            ))}
        </div>
      </div>
      
      {/* 按分类展示区域 */}
      {categories.map(category => {
        const gamesInCategory = allGames.filter(game => game.category === category.id);
        return (
          <div key={category.id} className="mb-10">
            <CategoryHeader 
              title={t(category.nameKey)} 
              count={gamesInCategory.length} 
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {gamesInCategory.map(game => (
                <GameCard
                  key={game.id}
                  id={game.id}
                  name={t(game.nameKey)}
                  description={t(game.descriptionKey)}
                  image={game.image}
                  category={t(`games.categories.${game.category}`)}
                />
              ))}
            </div>
          </div>
        );
      })}
      
      {/* 即将推出游戏区域 */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">{t('games.coming_soon')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allGames
            .filter(game => game.comingSoon)
            .map(game => (
              <GameCard
                key={game.id}
                id={game.id}
                name={t(game.nameKey)}
                description={t(game.descriptionKey)}
                image={game.image}
                category={t(`games.categories.${game.category}`)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default GamesPage; 