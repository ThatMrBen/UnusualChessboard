import * as React from 'react';  // 按ES模块方式导入React，避免default export警告
import { useTranslation } from 'react-i18next';  // 国际化hook
import PageHeader from '../components/PageHeader';  // 页面头部组件
import CategoryHeader from '../components/CategoryHeader';  // 分类头部组件
import GameCard from '../components/GameCard';  // 游戏卡片组件
import gameService from '../services/gameService';

/**
 * 游戏列表页面
 * 显示所有游戏分类和游戏卡片
 */
// GamesPage 组件，负责渲染所有游戏及分类
const GamesPage: React.FC = () => {
  const { t } = useTranslation();
  // 获取所有分类和全部游戏
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
          {/* 渲染所有可用游戏卡片 */}
          {allGames
            .filter(game => game.available)
            .map(game => (
              <GameCard
                key={game.id}
                id={game.id}
                name={t('language') === 'zh' ? `《${t(game.nameKey)}》` : t(game.nameKey)}
                description={t(game.descriptionKey)}
                image={game.image}
                category={t(`games.categories.${game.category}`)}
                playLabel={t('language') === 'zh' ? '开始游戏' : 'Play'}
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
              {/* 渲染该分类下所有游戏卡片 */}
              {gamesInCategory.map(game => (
                <GameCard
                  key={game.id}
                  id={game.id}
                  name={t('language') === 'zh' ? `《${t(game.nameKey)}》` : t(game.nameKey)}
                  description={t(game.descriptionKey)}
                  image={game.image}
                  category={t(`games.categories.${game.category}`)}
                  playLabel={t('language') === 'zh' ? '开始游戏' : 'Play'}
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
          {/* 渲染即将推出的游戏卡片 */}
          {allGames
            .filter(game => game.comingSoon)
            .map(game => (
              <GameCard
                key={game.id}
                id={game.id}
                name={t('language') === 'zh' ? `《${t(game.nameKey)}》` : t(game.nameKey)}
                description={t(game.descriptionKey)}
                image={game.image}
                category={t(`games.categories.${game.category}`)}
                playLabel={t('language') === 'zh' ? '开始游戏' : 'Play'}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default GamesPage; 