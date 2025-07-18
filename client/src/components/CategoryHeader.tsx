import React from 'react';

interface CategoryHeaderProps {
  title: string;
  count?: number;
}

/**
 * 分类标题组件
 * 用于显示游戏分类的标题和游戏数量
 */
// CategoryHeader 组件，负责渲染分类标题和数量
const CategoryHeader: React.FC<CategoryHeaderProps> = ({ title, count }) => {
  return (
    <div className="flex justify-between items-center mb-4 mt-8 border-b pb-2">
      <h2 className="text-2xl font-bold">{title}</h2>
      {/* 分类下的游戏数量徽章 */}
      {count !== undefined && (
        <span className="badge badge-primary">{count}</span>
      )}
    </div>
  );
};

export default CategoryHeader; 