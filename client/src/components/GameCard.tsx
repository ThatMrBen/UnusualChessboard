import * as React from 'react';
import { Link } from 'react-router-dom';
import gamePlaceholder from '../assets/game-placeholder.png'; // 引入游戏占位图

interface GameCardProps {
  id: string;
  name: string;
  description: string;
  image?: string;
  category: string;
  playLabel?: string;
}

/**
 * 游戏卡片组件
 * 用于游戏选择页面中展示单个游戏
 */
// GameCard 组件，负责渲染单个游戏信息卡片
const GameCard: React.FC<GameCardProps> = ({ id, name, description, category, playLabel }) => {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
      <figure>
        {/* 游戏图片 */}
        <img src={gamePlaceholder} alt={name} className="h-48 w-full object-cover" />
      </figure>
      <div className="card-body">
        <h3 className="card-title text-xl font-bold leading-tight mb-2">
          {name}
        </h3>
        <div className="mt-2">
          <span className="badge badge-outline whitespace-nowrap">{category}</span>
        </div>
        {/* 游戏描述 */}
        <p className="text-sm opacity-80 line-clamp-2">{description}</p>
        <div className="card-actions justify-end mt-4">
          {/* 跳转到游戏详情页 */}
          <Link 
            to={`/games/${id}`} 
            className="btn btn-primary btn-sm"
          >
            {playLabel}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameCard; 