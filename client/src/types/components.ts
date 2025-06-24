import { ReactNode, ErrorInfo } from 'react';
import type { Game, User } from './api';
import type { GameMode, Difficulty } from '../store/useGameStore';

// 基础组件Props类型
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

// 按钮组件Props类型
export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

// 卡片组件Props类型
export interface CardProps extends BaseComponentProps {
  title?: string;
  subtitle?: string;
  image?: string;
  actions?: ReactNode;
  bordered?: boolean;
  hoverable?: boolean;
}

// 游戏卡片Props类型
export interface GameCardProps {
  game: Game;
  onClick?: (game: Game) => void;
  className?: string;
}

// 模态框Props类型
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
}

// 表单字段Props类型
export interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'textarea';
  placeholder?: string;
  required?: boolean;
  error?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

// 选择器Props类型
export interface SelectProps {
  label: string;
  name: string;
  options: Array<{ value: string; label: string }>;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  error?: string;
  disabled?: boolean;
}

// 游戏设置Props类型
export interface GameSettingsProps {
  gameMode: GameMode | null;
  difficulty: Difficulty | null;
  onGameModeChange: (mode: GameMode) => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onStartGame: () => void;
}

// 用户资料编辑Props类型
export interface ProfileEditorProps {
  user: User;
  onSave: (userData: Partial<User>) => void;
  onCancel: () => void;
  loading?: boolean;
}

// 主题选择器Props类型
export interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
  themes?: Array<{ value: string; label: string; preview?: string }>;
}

// 语言选择器Props类型
export interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
  languages?: Array<{ value: string; label: string; flag?: string }>;
}

// 导航链接Props类型
export interface NavLinkProps {
  to: string;
  label: string;
  icon?: ReactNode;
  end?: boolean;
  className?: string;
}

// 页面头部Props类型
export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  breadcrumbs?: Array<{ label: string; to?: string }>;
}

// 加载状态Props类型
export interface LoadingProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

// 错误边界Props类型
export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

// 工具提示Props类型
export interface TooltipProps extends BaseComponentProps {
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'click' | 'focus';
  disabled?: boolean;
}

// 通知Props类型
export interface NotificationProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  onClose?: () => void;
}

// 分页Props类型
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
}

// 搜索框Props类型
export interface SearchBoxProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  loading?: boolean;
  disabled?: boolean;
  clearable?: boolean;
}

// 标签Props类型
export interface TagProps {
  label: string;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  closable?: boolean;
  onClose?: () => void;
}

// 进度条Props类型
export interface ProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  showLabel?: boolean;
  animated?: boolean;
}

// 统计卡片Props类型
export interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
} 