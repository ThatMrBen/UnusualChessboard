import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import gameService, { Game } from '../services/gameService';

/**
 * 游戏详情页面
 * 加载和展示特定游戏
 */
const GameDetailPage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 根据ID加载游戏信息
  useEffect(() => {
    setLoading(true);
    setError(null);

    if (!gameId) {
      setError('Game ID is missing');
      setLoading(false);
      return;
    }

    const gameInfo = gameService.getGameById(gameId);
    if (gameInfo) {
      setGame(gameInfo);
    } else {
      setError(`Game with ID "${gameId}" not found`);
    }

    setLoading(false);
  }, [gameId]);

  // 返回上一页
  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[500px]">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-error mb-4">{error || 'Game not found'}</h2>
        <button className="btn btn-primary" onClick={handleBack}>
          {t('actions.back')}
        </button>
      </div>
    );
  }

  // 检查游戏是否可用
  if (!game.available) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">{t(game.nameKey)}</h2>
        <p className="text-lg mb-6">{t('games.coming_soon')}</p>
        <button className="btn btn-primary" onClick={handleBack}>
          {t('actions.back')}
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* 游戏标题区域 */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t(game.nameKey)}</h1>
        <button className="btn btn-outline" onClick={handleBack}>
          {t('actions.back')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 游戏信息区域 */}
        <div className="lg:col-span-1">
          <div className="card bg-base-200 shadow-xl">
            {game.image && (
              <figure>
                <img src={game.image} alt={t(game.nameKey)} className="w-full h-64 object-cover" />
              </figure>
            )}
            <div className="card-body">
              <h2 className="card-title">{t(game.nameKey)}</h2>
              <p>{t(game.descriptionKey)}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <div className="badge badge-primary">{t(`games.categories.${game.category}`)}</div>
              </div>
            </div>
          </div>

          {/* 游戏选项区域 */}
          <div className="mt-6 card bg-base-200 shadow-xl">
            <div className="card-body">
              <h3 className="text-xl font-bold mb-4">游戏选项</h3>
              
              {/* 游戏模式选择 */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">游戏模式</span>
                </label>
                <select className="select select-bordered w-full">
                  <option value="player_vs_ai">{t('game_modes.player_vs_ai')}</option>
                  <option value="player_vs_player">{t('game_modes.player_vs_player')}</option>
                  <option value="ai_vs_ai">{t('game_modes.ai_vs_ai')}</option>
                </select>
              </div>
              
              {/* 难度选择 */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">难度</span>
                </label>
                <select className="select select-bordered w-full">
                  <option value="easy">{t('difficulty.easy')}</option>
                  <option value="medium">{t('difficulty.medium')}</option>
                  <option value="hard">{t('difficulty.hard')}</option>
                </select>
              </div>
              
              <div className="card-actions justify-end mt-4">
                <button className="btn btn-primary">{t('actions.play')}</button>
              </div>
            </div>
          </div>
        </div>

        {/* 游戏主区域 */}
        <div className="lg:col-span-2">
          <div className="card bg-base-200 shadow-xl min-h-[600px] flex items-center justify-center">
            {/* 游戏内容将在这里加载 */}
            <p className="text-xl">游戏内容将在这里加载</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetailPage; 