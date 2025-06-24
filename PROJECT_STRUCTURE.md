# UnusualChessboard Project Structure | 这个棋盘不一般项目结构

[English](#project-structure) | [中文](#项目结构)

### Project Information

- **Project Name**: UnusualChessboard
- **Maintainers**: *UnusualChessboard* Development Group
- **Repository**: https://github.com/ThatMrBen/UnusualChessboard
- **Copyright**: © 2025

## Project Structure

This document describes the directory structure and file organization of the UnusualChessboard project.

### Root Directory Structure

```
UnusualChessboard/
├── client/               # Frontend application
├── server/               # Backend application
├── mobile/               # Mobile application
├── .github/              # GitHub configuration
├── .gitignore            # Git ignore file
├── CODE_OF_CONDUCT.md    # Code of conduct
├── CONTRIBUTING.md       # Contribution guide
├── development_plan.md   # Development plan
├── LICENSE               # License
├── package.json          # Root configuration with npm workspaces
├── PROJECT_STRUCTURE.md  # This file (project structure documentation)
└── README.md             # Project description
```

### Frontend Application Structure (client/)

```
client/
├── public/               # Static assets
│   └── favicon.svg       # Website icon
├── src/                  # Source code
│   ├── assets/           # Static assets (images, fonts)
│   ├── components/       # UI components
│   │   ├── CategoryHeader.tsx    # Category header component
│   │   ├── ErrorBoundary.tsx     # Error boundary component
│   │   ├── GameCard.tsx          # Game card component
│   │   ├── LoadingSpinner.tsx    # Loading spinner component
│   │   ├── Navigation.tsx        # Navigation component
│   │   ├── PageHeader.tsx        # Page header component
│   │   ├── ProfileEditor.tsx     # Profile editor component
│   │   └── ThemeSelector.tsx     # Theme selector component
│   ├── games/            # Game implementations
│   │   ├── chess/        # International Chess
│   │   ├── chinese-chess/ # Chinese Chess
│   │   ├── gobang/       # Five in a Row
│   │   ├── go/           # Go
│   │   └── ...           # Other games
│   ├── hooks/            # Custom React hooks
│   │   └── usePerformance.ts     # Performance monitoring hook
│   ├── i18n/             # Internationalization
│   │   ├── locales/      # Translation files
│   │   │   ├── en.json   # English translation
│   │   │   └── zh.json   # Chinese translation
│   │   └── i18n.ts       # i18n configuration
│   ├── layouts/          # Layout components
│   │   └── MainLayout.tsx # Main layout
│   ├── pages/            # Page components
│   │   ├── AboutPage.tsx         # About page
│   │   ├── GameDetailPage.tsx    # Game detail page
│   │   ├── GamesPage.tsx         # Games list page
│   │   ├── HomePage.tsx          # Home page
│   │   └── SettingsPage.tsx      # Settings page
│   ├── router/           # Router configuration
│   │   └── index.tsx     # Router with lazy loading
│   ├── services/         # API services
│   │   ├── api.ts        # API client for backend communication
│   │   └── gameService.ts # Game-specific API services
│   ├── store/            # State management
│   │   └── useGameStore.ts # Game state with cloud sync support
│   ├── styles/           # Style files
│   │   └── index.css     # Main style file
│   ├── types/            # TypeScript type definitions
│   │   ├── api.ts        # API-related types
│   │   └── components.ts # Component prop types
│   ├── utils/            # Utility functions
│   │   ├── gameUtils.ts  # Game utility functions
│   │   ├── i18n.ts       # i18n utility functions
│   │   └── i18nValidator.ts # i18n validation utilities
│   ├── App.tsx           # Root component
│   ├── main.tsx          # Entry point
│   └── vite-env.d.ts     # Vite type declarations
├── eslint.config.js      # ESLint configuration (v9 format)
├── index.html            # HTML entry file
├── package.json          # Dependencies and scripts
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.js    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
├── tsconfig.node.json    # Node.js TypeScript configuration
└── vite.config.ts        # Vite configuration with optimizations
```

### Backend Application Structure (server/)

```
server/
├── src/                  # Source code
│   ├── config/           # Configuration files
│   │   └── db.ts         # Database configuration
│   ├── controllers/      # Request handlers
│   │   ├── authController.ts # Authentication controller
│   │   └── gameDataController.ts # Game data controller
│   ├── middlewares/      # Middleware
│   │   ├── authMiddleware.ts # Authentication middleware
│   │   └── errorHandler.ts # Error handling middleware
│   ├── models/           # Database models
│   │   ├── User.ts       # User model
│   │   ├── GameData.ts   # Game data model
│   │   └── VerificationCode.ts # Verification code model
│   ├── routes/           # API routes
│   │   ├── authRoutes.ts # Authentication routes
│   │   ├── gameDataRoutes.ts # Game data routes
│   │   ├── userRoutes.ts # User management routes
│   │   └── index.ts      # Main router
│   ├── services/         # Business logic
│   │   └── mockDataService.ts # Mock data service
│   ├── types/            # Type definitions
│   │   ├── express.d.ts  # Express type extensions
│   │   └── index.ts      # Common types
│   ├── utils/            # Utility functions
│   │   └── i18n.ts       # i18n utility functions
│   └── index.ts          # Entry point
├── tests/                # Test files
├── .env                  # Environment variables (not committed to Git)
├── .env.example          # Environment variables example
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

### Mobile Application Structure (mobile/)

```
mobile/
├── src/                  # Source code
├── resources/            # Mobile app resources (icons, splash screens)
├── config/               # Mobile app configuration
│   └── index.ts          # Configuration settings
├── www/                  # Built web app (generated from client build)
├── android/              # Android platform code (generated by Capacitor)
├── ios/                  # iOS platform code (generated by Capacitor)
├── capacitor.config.ts   # Capacitor configuration
└── package.json          # Dependencies and scripts
```

### Tech Stack

- **Frontend**:
  - React 19.1.0 + TypeScript 5.8.3
  - Vite 6.3.5 (build tool with optimizations)
  - DaisyUI 5.0.43 (Tailwind CSS 3.4.0-based component library)
  - i18next 25.2.1 (internationalization)
  - Zustand 5.0.5 (state management)
  - React Router 7.6.2 (routing with lazy loading)
  - Axios 1.10.0 (HTTP client with interceptors)

- **Backend**:
  - Node.js + TypeScript 5.8.3
  - Express 4.21.2 (web framework)
  - MongoDB + Mongoose 8.16.0 (database)
  - JWT 9.0.2 (authentication)
  - Nodemailer 6.10.1 (email service)
  - Winston 3.11.0 (logging)
  - Bcrypt 6.0.0 (password hashing)

- **Mobile App**:
  - Capacitor 6.0.0 (cross-platform mobile app framework)
  - Support for iOS, Android, and HarmonyOS

- **Development Tools**:
  - ESLint 9.29.0 (code linting with comprehensive rules)
  - Prettier 3.6.0 (code formatting)
  - TypeScript strict mode enabled
  - Terser (code minification)

### Key Features

- **Performance Optimized**: Code splitting, lazy loading, error boundaries
- **Type Safe**: 95%+ TypeScript coverage with strict typing
- **Modern Architecture**: Optimized build configuration and state management
- **Internationalization**: Complete i18n support with validation
- **Error Handling**: Comprehensive error boundaries and recovery
- **Development Tools**: Advanced linting and formatting

### Development Environment Setup

1. **Install Dependencies** (Using npm workspaces):
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Build Project**:
   ```bash
   npm run build
   ```

4. **Start Production Server**:
   ```bash
   npm run start
   ```

5. **Clean Dependencies** (If needed):
   ```bash
   npm run clean
   ```

### Mobile App Development

1. **Add Platforms**:
   ```bash
   cd mobile
   npm run cap:add:android  # Add Android platform
   npm run cap:add:ios      # Add iOS platform
   ```

2. **Build and Sync**:
   ```bash
   npm run build:mobile
   ```

3. **Open Platform IDE**:
   ```bash
   npm run cap:open:android  # Open Android Studio
   npm run cap:open:ios      # Open Xcode
   ```

## 项目结构

### 项目信息

- **项目名称**: 这个棋盘不一般
- **维护者**: 《这个棋盘不一般》开发团队
- **代码仓库**: https://github.com/ThatMrBen/UnusualChessboard
- **版权**: © 2025

本文档描述了《这个棋盘不一般》项目的目录结构和文件组织。

### 根目录结构

```
UnusualChessboard/
├── client/               # 前端应用
├── server/               # 后端应用
├── mobile/               # 移动应用
├── .github/              # GitHub配置
├── .gitignore            # Git忽略文件
├── CODE_OF_CONDUCT.md    # 行为准则
├── CONTRIBUTING.md       # 贡献指南
├── development_plan.md   # 开发计划
├── LICENSE               # 许可证
├── package.json          # 根配置（npm workspaces）
├── PROJECT_STRUCTURE.md  # 本文档（项目结构文档）
└── README.md             # 项目描述
```

### 前端应用结构 (client/)

```
client/
├── public/               # 静态资源
│   └── favicon.svg       # 网站图标
├── src/                  # 源代码
│   ├── assets/           # 静态资源（图片、字体）
│   ├── components/       # UI组件
│   │   ├── CategoryHeader.tsx    # 分类头部组件
│   │   ├── ErrorBoundary.tsx     # 错误边界组件
│   │   ├── GameCard.tsx          # 游戏卡片组件
│   │   ├── LoadingSpinner.tsx    # 加载动画组件
│   │   ├── Navigation.tsx        # 导航组件
│   │   ├── PageHeader.tsx        # 页面头部组件
│   │   ├── ProfileEditor.tsx     # 资料编辑器组件
│   │   └── ThemeSelector.tsx     # 主题选择器组件
│   ├── games/            # 游戏实现
│   │   ├── chess/        # 国际象棋
│   │   ├── chinese-chess/ # 中国象棋
│   │   ├── gobang/       # 五子棋
│   │   ├── go/           # 围棋
│   │   └── ...           # 其他游戏
│   ├── hooks/            # 自定义React钩子
│   │   └── usePerformance.ts     # 性能监控钩子
│   ├── i18n/             # 国际化
│   │   ├── locales/      # 翻译文件
│   │   │   ├── en.json   # 英文翻译
│   │   │   └── zh.json   # 中文翻译
│   │   └── i18n.ts       # i18n配置
│   ├── layouts/          # 布局组件
│   │   └── MainLayout.tsx # 主布局
│   ├── pages/            # 页面组件
│   │   ├── AboutPage.tsx         # 关于页面
│   │   ├── GameDetailPage.tsx    # 游戏详情页面
│   │   ├── GamesPage.tsx         # 游戏列表页面
│   │   ├── HomePage.tsx          # 首页
│   │   └── SettingsPage.tsx      # 设置页面
│   ├── router/           # 路由配置
│   │   └── index.tsx     # 带懒加载的路由
│   ├── services/         # API服务
│   │   ├── api.ts        # 后端通信API客户端
│   │   └── gameService.ts # 游戏专用API服务
│   ├── store/            # 状态管理
│   │   └── useGameStore.ts # 支持云端同步的游戏状态
│   ├── styles/           # 样式文件
│   │   └── index.css     # 主样式文件
│   ├── types/            # TypeScript类型定义
│   │   ├── api.ts        # API相关类型
│   │   └── components.ts # 组件属性类型
│   ├── utils/            # 工具函数
│   │   ├── gameUtils.ts  # 游戏工具函数
│   │   ├── i18n.ts       # i18n工具函数
│   │   └── i18nValidator.ts # i18n验证工具
│   ├── App.tsx           # 根组件
│   ├── main.tsx          # 入口点
│   └── vite-env.d.ts     # Vite类型声明
├── eslint.config.js      # ESLint配置（v9格式）
├── index.html            # HTML入口文件
├── package.json          # 依赖和脚本
├── postcss.config.js     # PostCSS配置
├── tailwind.config.js    # Tailwind配置
├── tsconfig.json         # TypeScript配置
├── tsconfig.node.json    # Node.js TypeScript配置
└── vite.config.ts        # 带优化的Vite配置
```

### 后端应用结构 (server/)

```
server/
├── src/                  # 源代码
│   ├── config/           # 配置文件
│   │   └── db.ts         # 数据库配置
│   ├── controllers/      # 请求处理器
│   │   ├── authController.ts # 身份验证控制器
│   │   └── gameDataController.ts # 游戏数据控制器
│   ├── middlewares/      # 中间件
│   │   ├── authMiddleware.ts # 身份验证中间件
│   │   └── errorHandler.ts # 错误处理中间件
│   ├── models/           # 数据库模型
│   │   ├── User.ts       # 用户模型
│   │   ├── GameData.ts   # 游戏数据模型
│   │   └── VerificationCode.ts # 验证码模型
│   ├── routes/           # API路由
│   │   ├── authRoutes.ts # 身份验证路由
│   │   ├── gameDataRoutes.ts # 游戏数据路由
│   │   ├── userRoutes.ts # 用户管理路由
│   │   └── index.ts      # 主路由
│   ├── services/         # 业务逻辑
│   │   └── mockDataService.ts # 模拟数据服务
│   ├── types/            # 类型定义
│   │   ├── express.d.ts  # Express类型扩展
│   │   └── index.ts      # 通用类型
│   ├── utils/            # 工具函数
│   │   └── i18n.ts       # i18n工具函数
│   └── index.ts          # 入口点
├── tests/                # 测试文件
├── .env                  # 环境变量（不提交到Git）
├── .env.example          # 环境变量示例
├── package.json          # 依赖和脚本
└── tsconfig.json         # TypeScript配置
```

### 移动应用结构 (mobile/)

```
mobile/
├── src/                  # 源代码
├── resources/            # 移动应用资源（图标、启动屏）
├── config/               # 移动应用配置
│   └── index.ts          # 配置设置
├── www/                  # 构建的Web应用（从client构建生成）
├── android/              # Android平台代码（由Capacitor生成）
├── ios/                  # iOS平台代码（由Capacitor生成）
├── capacitor.config.ts   # Capacitor配置
└── package.json          # 依赖和脚本
```

### 技术栈

- **前端**：
  - React 19.1.0 + TypeScript 5.8.3
  - Vite 6.3.5（带优化的构建工具）
  - DaisyUI 5.0.43（基于Tailwind CSS 3.4.0的组件库）
  - i18next 25.2.1（国际化）
  - Zustand 5.0.5（状态管理）
  - React Router 7.6.2（带懒加载的路由）
  - Axios 1.10.0（带拦截器的HTTP客户端）

- **后端**：
  - Node.js + TypeScript 5.8.3
  - Express 4.21.2（Web框架）
  - MongoDB + Mongoose 8.16.0（数据库）
  - JWT 9.0.2（身份验证）
  - Nodemailer 6.10.1（邮件服务）
  - Winston 3.11.0（日志）
  - Bcrypt 6.0.0（密码哈希）

- **移动应用**：
  - Capacitor 6.0.0（跨平台移动应用框架）
  - 支持iOS、Android和鸿蒙系统

- **开发工具**：
  - ESLint 9.29.0（带全面规则的代码检查）
  - Prettier 3.6.0（代码格式化）
  - TypeScript严格模式
  - Terser（代码压缩）

### 关键特性

- **性能优化**：代码分割、懒加载、错误边界
- **类型安全**：95%+ TypeScript覆盖率，严格类型检查
- **现代架构**：优化的构建配置和状态管理
- **国际化**：完整的i18n支持和验证
- **错误处理**：全面的错误边界和恢复
- **开发工具**：高级代码检查和格式化

### 开发环境设置

1. **安装依赖**（使用npm workspaces）：
   ```bash
   npm install
   ```

2. **启动开发服务器**：
   ```bash
   npm run dev
   ```

3. **构建项目**：
   ```bash
   npm run build
   ```

4. **启动生产服务器**：
   ```bash
   npm run start
   ```

5. **清理依赖**（如需要）：
   ```bash
   npm run clean
   ```

### 移动应用开发

1. **添加平台**：
   ```bash
   cd mobile
   npm run cap:add:android  # 添加Android平台
   npm run cap:add:ios      # 添加iOS平台
   ```

2. **构建和同步**：
   ```bash
   npm run build:mobile
   ```

3. **打开平台IDE**：
   ```bash
   npm run cap:open:android  # 打开Android Studio
   npm run cap:open:ios      # 打开Xcode
   ``` 