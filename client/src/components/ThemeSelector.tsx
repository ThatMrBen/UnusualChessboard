import React, { useEffect, useState } from 'react';

/**
 * 主题选择器组件
 * 支持daisyUI主题分组、切换和本地存储
 * 展示所有可用主题（ALL_THEMES）
 */
// DaisyUI官网顺序的35个主题
const DAISYUI_THEMES = [
  'light', 'dark', 'cupcake', 'bumblebee', 'emerald',
  'corporate', 'synthwave', 'retro', 'cyberpunk', 'valentine',
  'halloween', 'garden', 'forest', 'aqua', 'lofi',
  'pastel', 'fantasy', 'wireframe', 'black', 'luxury',
  'dracula', 'cmyk', 'autumn', 'business', 'acid',
  'lemonade', 'night', 'coffee', 'winter', 'dim',
  'nord', 'sunset', 'caramellatte', 'abyss', 'silk'
];

// 单个主题卡片组件
const ThemeCard: React.FC<{ theme: string; selected: boolean; onClick: () => void }> = ({ theme, selected, onClick }) => {
  return (
    <div
      data-theme={theme}
      className={`rounded-xl shadow p-3 flex flex-col items-center cursor-pointer border-2 transition-all duration-200 select-none ${selected ? 'border-primary ring-2 ring-primary' : 'border-base-200 hover:border-primary/60'}`}
      style={{ minWidth: 140, minHeight: 80 }}
      onClick={onClick}
    >
      {/* 色块展示 */}
      <div className="flex gap-1 mb-2">
        <span className="inline-block w-5 h-5 rounded bg-primary flex items-center justify-center text-xs text-primary-content font-bold">A</span>
        <span className="inline-block w-5 h-5 rounded bg-secondary flex items-center justify-center text-xs text-secondary-content font-bold">A</span>
        <span className="inline-block w-5 h-5 rounded bg-accent flex items-center justify-center text-xs text-accent-content font-bold">A</span>
        <span className="inline-block w-5 h-5 rounded bg-base-200 border border-base-300 flex items-center justify-center text-xs text-base-content font-bold">A</span>
      </div>
      {/* 主题名 */}
      <div className="font-bold text-xs tracking-wide text-base-content capitalize">{theme}</div>
    </div>
  );
};

// 主题选择器主组件
const ThemeSelector: React.FC = () => {
  // 当前主题状态，初始值从localStorage获取
  const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || 'light');

  // 主题切换时，更新html属性和本地存储
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="grid grid-cols-5 gap-4 max-w-5xl mx-auto">
      {/* 展示所有主题，顺序与官网一致 */}
      {DAISYUI_THEMES.map((th) => (
        <ThemeCard key={th} theme={th} selected={theme === th} onClick={() => setTheme(th)} />
      ))}
    </div>
  );
};

export default ThemeSelector; 