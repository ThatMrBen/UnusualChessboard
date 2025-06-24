import * as React from 'react';
import type { LoadingProps } from '../types/components';

/**
 * 加载组件
 * 提供多种样式的加载指示器
 */
const LoadingSpinner: React.FC<LoadingProps> = ({
  size = 'md',
  text,
  fullScreen = false,
  className = '',
}: LoadingProps) => {
  const sizeClasses = {
    sm: 'loading-sm',
    md: 'loading-md',
    lg: 'loading-lg',
  };

  const containerClasses = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-base-100 bg-opacity-80 z-50'
    : 'flex items-center justify-center';

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className="flex flex-col items-center space-y-4">
        <div className={`loading loading-spinner ${sizeClasses[size as 'sm' | 'md' | 'lg']} text-primary`}></div>
        {text && (
          <div className="text-center">
            <p className="text-base-content text-sm">{text}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner; 