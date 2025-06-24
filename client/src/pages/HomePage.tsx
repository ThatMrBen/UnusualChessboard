import * as React from 'react';
import { useTranslation } from 'react-i18next';
import GameCard from '../components/GameCard';
import gameService from '../services/gameService';

/**
 * 首页组件
 * 作为项目的入口页面，展示欢迎信息和推荐游戏
 */
// HomePage 组件，负责渲染首页内容
const HomePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  // 获取可用游戏列表
  let availableGames = gameService.getAvailableGames();
  // 如不足6个，补充coming soon游戏
  if (availableGames.length < 6) {
    const allGames = gameService.getAllGames();
    const comingSoon = allGames.filter(g => !g.available).slice(0, 6 - availableGames.length);
    availableGames = availableGames.concat(comingSoon);
  }
  availableGames = availableGames.slice(0, 6);
  
  return (
    <div className="flex flex-col items-center">
      {/* 欢迎区域 */}
      <div className="text-center max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-4">
          {i18n.language === 'zh' ? `《${t('home.title')}》` : <em>{t('home.title')}</em>}
        </h1>
        <p className="text-lg mb-8">{t('home.subtitle')}</p>
        <a href="/games" className="btn btn-primary btn-lg">
          {t('get_started')}
        </a>
      </div>
      {/* 特色游戏区域 */}
      <div className="w-full py-10">
        <h2 className="text-3xl font-bold mb-8 text-center">{t('games.available_games')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 渲染前6个可用游戏卡片 */}
          {availableGames.map((game) => (
            <GameCard
              key={game.id}
              id={game.id}
              name={t(game.nameKey)}
              description={t(game.descriptionKey)}
              category={t(`games.categories.${game.category}`)}
              playLabel={t('language') === 'zh' ? '开始游戏' : 'Play'}
            />
          ))}
        </div>
      </div>
      {/* 关于内容区域 */}
      <div className="bg-base-200 w-full py-16">
        <div className="max-w-4xl mx-auto text-center prose prose-lg">
          <h2 className="text-2xl font-bold mb-8">
            {i18n.language === 'zh' ? `关于《${t('home.title')}》` : <>About <em>{t('home.title')}</em></>}
          </h2>
          {/* 项目简介 */}
          <section className="mb-10">
            <p className="text-lg font-semibold mb-4">
              {i18n.language === 'zh'
                ? `《${t('home.title')}》是一个多平台国际象棋和棋盘游戏合集。`
                : <><em>{t('home.title')}</em> is a multi-platform chess and board game collection.</>}
            </p>
            <p>{t('about.project_intro')}</p>
          </section>
          {/* 项目特点 */}
          <section className="mb-10">
            <h2>{t('about.features_title')}</h2>
            <ul>
              {(t('about.features', { returnObjects: true }) as string[]).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>
          {/* 技术栈 */}
          <section className="mb-10">
            <h2>{t('about.tech_title')}</h2>
            <ul>
              {(t('about.techs', { returnObjects: true }) as string[]).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>
          {/* 团队信息 */}
          <section className="mb-10">
            <h2>{t('about.team_title')}</h2>
            <p>{t('about.team_info')}</p>
            <p>
              {t('about.github')}
              <a href="https://github.com/ThatMrBen/UnusualChessboard" target="_blank" rel="noopener noreferrer">
                https://github.com/ThatMrBen/UnusualChessboard
              </a>
            </p>
          </section>
          {/* 许可协议 */}
          <section className="mb-10">
            <h2>{t('about.license_title')}</h2>
            <p>{t('about.license')}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 