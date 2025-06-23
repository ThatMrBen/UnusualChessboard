import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

/**
 * 页面标题组件
 * 用于显示页面的主要标题和可选的副标题
 */
const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      {subtitle && <p className="text-lg opacity-80">{subtitle}</p>}
    </div>
  );
};

export default PageHeader; 