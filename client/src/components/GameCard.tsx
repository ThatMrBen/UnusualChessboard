import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface GameCardProps {
  id: string;
  name: string;
  description: string;
  image?: string;
  category: string;
}

/**
 * 游戏卡片组件
 * 用于游戏选择页面中展示单个游戏
 */
const GameCard: React.FC<GameCardProps> = ({ id, name, description, image, category }) => {
  const { t } = useTranslation();
  const defaultImage = `https://placehold.co/300x200/3D4451/FFFFFF?text=${encodeURIComponent(name)}`;
  
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
      <figure>
        <img src={image || defaultImage} alt={name} className="h-48 w-full object-cover" />
      </figure>
      <div className="card-body">
        <h3 className="card-title">
          {name}
          <div className="badge badge-secondary">{category}</div>
        </h3>
        <p className="text-sm opacity-80 line-clamp-2">{description}</p>
        <div className="card-actions justify-end mt-4">
          <Link 
            to={`/games/${id}`} 
            className="btn btn-primary btn-sm"
          >
            {t('actions.play')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameCard; 