# Contributing to UnusualChessboard | 这个棋盘不一般的贡献指南

[English](#english) | [中文](#中文)

## English

Thank you for your interest in contributing to UnusualChessboard! This document provides guidelines and instructions for contributing to this project.

### Project Information

- **Project Name**: UnusualChessboard | 这个棋盘不一般
- **Maintainers**: *UnusualChessboard* Development Group | 《这个棋盘不一般》开发团队
- **Repository**: https://github.com/ThatMrBen/UnusualChessboard
- **Copyright**: © 2025

### How to Contribute

1. **Fork the Repository**: Create your own fork of the project.

2. **Clone the Repository**: Clone your fork to your local machine.
   ```
   git clone https://github.com/YOUR_USERNAME/UnusualChessboard.git
   ```

3. **Create a Branch**: Create a branch for your feature or bugfix.
   ```
   git checkout -b feature/your-feature-name
   ```

4. **Make Changes**: Implement your changes following the coding standards.

5. **Test Your Changes**: Ensure your changes work as expected and don't break existing functionality.

6. **Commit Your Changes**: Commit with a clear and descriptive message.
   ```
   git commit -m "Add feature: description of your feature"
   ```

7. **Push to Your Fork**: Push your changes to your fork.
   ```
   git push origin feature/your-feature-name
   ```

8. **Create a Pull Request**: Submit a pull request from your branch to the main repository.

### Coding Standards

- Follow existing code style and patterns
- Use DaisyUI components for UI elements to maintain consistency
- Write clear, commented code
- Include documentation for new features
- Keep commits focused and atomic
- Test your changes across multiple platforms (web, iOS, Android, HarmonyOS) when applicable
- Follow security best practices for user authentication and data storage
- Use proper validation for user inputs, especially in authentication flows

### Development Environment Setup

1. **Install Dependencies** (Using npm workspaces):
   ```
   npm install
   ```

2. **Run Development Server**:
   ```
   npm run dev
   ```

3. **Set Up Backend Services** (if working on user system features):
   ```
   # Since we're using npm workspaces, you can run the server:
   npm run dev:server
   
   # To run just the server directly:
   npm run dev --workspace=server
   
   # Set up environment variables
   cp server/.env.example server/.env
   # Edit .env with your configuration
   ```

4. **For Mobile Development**:
   ```
   # Build the client app and sync with mobile:
   npm run build:mobile
   
   # Add platforms
   npm run cap:add:android --workspace=mobile  # For Android
   npm run cap:add:ios --workspace=mobile      # For iOS
   
   # Open platform IDE
   npm run cap:open:android --workspace=mobile  # For Android Studio
   npm run cap:open:ios --workspace=mobile      # For Xcode
   ```

5. **Clean Dependencies** (if needed):
   ```
   npm run clean
   ```

### Project Structure

```
UnusualChessboard/
├── client/               # Frontend application
│   ├── public/           # Static assets
│   │   └── favicon.svg   # Website icon
│   ├── src/              # Source code
│   │   ├── assets/       # Static assets (images, fonts)
│   │   ├── components/   # UI components
│   │   ├── games/        # Game implementations
│   │   │   ├── chess/    # International Chess
│   │   │   ├── chinese-chess/ # Chinese Chess
│   │   │   ├── gobang/   # Five in a Row
│   │   │   ├── go/       # Go
│   │   │   └── ...       # Other games
│   │   ├── hooks/        # Custom React hooks
│   │   ├── i18n/         # Internationalization
│   │   │   ├── locales/  # Translation files
│   │   │   │   ├── en.json # English translation
│   │   │   │   └── zh.json # Chinese translation
│   │   │   └── i18n.ts   # i18n configuration
│   │   ├── layouts/      # Layout components
│   │   │   └── MainLayout.tsx # Main layout
│   │   ├── router/       # Router configuration
│   │   ├── services/     # API services
│   │   │   └── api.ts    # API client for backend communication
│   │   ├── store/        # State management
│   │   │   └── useGameStore.ts # Game state with cloud sync support
│   │   ├── styles/       # Style files
│   │   │   └── index.css # Main style file
│   │   ├── utils/        # Utility functions
│   │   ├── App.tsx       # Root component
│   │   ├── main.tsx      # Entry point
│   │   └── vite-env.d.ts # Vite type declarations
│   ├── .eslintrc.json    # ESLint configuration
│   ├── .prettierrc       # Prettier configuration
│   ├── index.html        # HTML entry file
│   ├── package.json      # Dependencies and scripts
│   ├── postcss.config.js # PostCSS configuration
│   ├── tailwind.config.js # Tailwind configuration
│   ├── tsconfig.json     # TypeScript configuration
│   ├── tsconfig.node.json # Node.js TypeScript configuration
│   └── vite.config.ts    # Vite configuration
├── server/               # Backend application
│   ├── src/              # Source code
│   │   ├── config/       # Configuration files
│   │   │   └── db.ts     # Database configuration
│   │   ├── controllers/  # Request handlers
│   │   │   ├── authController.ts # Authentication controller
│   │   │   └── gameDataController.ts # Game data controller
│   │   ├── middlewares/  # Middleware
│   │   │   ├── authMiddleware.ts # Authentication middleware
│   │   │   └── errorHandler.ts # Error handling middleware
│   │   ├── models/       # Database models
│   │   │   ├── User.ts   # User model
│   │   │   ├── GameData.ts # Game data model
│   │   │   └── VerificationCode.ts # Verification code model
│   │   ├── routes/       # API routes
│   │   │   ├── authRoutes.ts # Authentication routes
│   │   │   ├── gameDataRoutes.ts # Game data routes
│   │   │   └── index.ts  # Main router
│   │   ├── services/     # Business logic
│   │   ├── types/        # Type definitions
│   │   │   ├── express.d.ts # Express type extensions
│   │   │   └── index.ts  # Common types
│   │   ├── utils/        # Utility functions
│   │   └── index.ts      # Entry point
│   ├── tests/            # Test files
│   ├── .env.example      # Environment variables example
│   ├── package.json      # Dependencies and scripts
│   └── tsconfig.json     # TypeScript configuration
├── mobile/               # Mobile application
│   ├── src/              # Source code
│   ├── resources/        # Mobile app resources (icons, splash screens)
│   ├── config/           # Mobile app configuration
│   ├── www/              # Built web app (generated from client)
│   ├── android/          # Android platform code (generated by Capacitor)
│   ├── ios/              # iOS platform code (generated by Capacitor)
│   ├── capacitor.config.ts # Capacitor configuration
│   └── package.json      # Dependencies and scripts
├── .github/              # GitHub configuration
├── .gitignore            # Git ignore file
├── CODE_OF_CONDUCT.md    # Code of conduct
├── CONTRIBUTING.md       # This file (contribution guide)
├── development_plan.md   # Development plan
├── LICENSE               # License
├── package.json          # Root configuration
├── PROJECT_STRUCTURE.md  # Project structure documentation
└── README.md             # Project description
```

### Types of Contributions

- Bug fixes
- New game implementations
- UI/UX improvements using DaisyUI components
- Documentation improvements
- Translations
- Mobile platform optimizations
- Performance enhancements
- User authentication and security improvements
- Server-side API integrations
- Database optimizations

### License

By contributing to UnusualChessboard, you agree that your contributions will be licensed under the project's [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/) and attributed to *UnusualChessboard* Development Group | 《这个棋盘不一般》开发团队.

## 中文

感谢您对《这个棋盘不一般》的贡献兴趣！本文档提供了为本项目贡献的指南和说明。

### 项目信息

- **项目名称**: UnusualChessboard | 这个棋盘不一般
- **维护者**: *UnusualChessboard* Development Group | 《这个棋盘不一般》开发团队
- **代码仓库**: https://github.com/ThatMrBen/UnusualChessboard
- **版权**: © 2025

### 如何贡献

1. **复刻（Fork）仓库**：创建项目的个人复刻。

2. **克隆仓库**：将您的复刻克隆到本地机器。
   ```
   git clone https://github.com/您的用户名/UnusualChessboard.git
   ```

3. **创建分支**：为您的功能或错误修复创建一个分支。
   ```
   git checkout -b feature/您的功能名称
   ```

4. **进行更改**：按照编码标准实施您的更改。

5. **测试您的更改**：确保您的更改按预期工作，且不会破坏现有功能。

6. **提交您的更改**：使用清晰描述性的消息提交。
   ```
   git commit -m "添加功能：您的功能描述"
   ```

7. **推送到您的复刻**：将您的更改推送到您的复刻。
   ```
   git push origin feature/您的功能名称
   ```

8. **创建拉取请求**：从您的分支向主仓库提交拉取请求。

### 编码标准

- 遵循现有代码风格和模式
- 使用DaisyUI组件库构建UI元素，保持一致性
- 编写清晰、有注释的代码
- 为新功能包含文档
- 保持提交专注且原子化
- 在适用情况下，测试您的更改在多个平台上的表现（网页、iOS、Android、鸿蒙）
- 遵循用户认证和数据存储的安全最佳实践
- 对用户输入进行适当验证，特别是在认证流程中

### 开发环境设置

1. **安装依赖**（使用npm workspaces）：
   ```
   npm install
   ```

2. **运行开发服务器**：
   ```
   npm run dev
   ```

3. **设置后端服务**（如果处理用户系统功能）：
   ```
   # 由于使用npm workspaces，可以直接运行服务器：
   npm run dev:server
   
   # 要直接运行服务器：
   npm run dev --workspace=server
   
   # 设置环境变量
   cp server/.env.example server/.env
   # 用你的配置编辑.env文件
   ```

4. **对于移动开发**：
   ```
   # 构建客户端应用并与移动端同步：
   npm run build:mobile
   
   # 添加平台
   npm run cap:add:android --workspace=mobile  # 对于Android
   npm run cap:add:ios --workspace=mobile      # 对于iOS
   
   # 打开平台IDE
   npm run cap:open:android --workspace=mobile  # 对于Android Studio
   npm run cap:open:ios --workspace=mobile      # 对于Xcode
   ```

5. **清理依赖项**（如需要）：
   ```
   npm run clean
   ```

### 项目结构

```
UnusualChessboard/
├── client/               # 前端应用
│   ├── public/           # 静态资源
│   │   └── favicon.svg   # 网站图标
│   ├── src/              # 源代码
│   │   ├── assets/       # 静态资源（图片、字体等）
│   │   ├── components/   # UI组件
│   │   ├── games/        # 游戏实现
│   │   │   ├── chess/    # 国际象棋
│   │   │   ├── chinese-chess/ # 中国象棋
│   │   │   ├── gobang/   # 五子棋
│   │   │   ├── go/       # 围棋
│   │   │   └── ...       # 其他游戏
│   │   ├── hooks/        # 自定义React钩子
│   │   ├── i18n/         # 国际化
│   │   │   ├── locales/  # 翻译文件
│   │   │   │   ├── en.json # 英文翻译
│   │   │   │   └── zh.json # 中文翻译
│   │   │   └── i18n.ts   # i18n配置
│   │   ├── layouts/      # 布局组件
│   │   │   └── MainLayout.tsx # 主布局
│   │   ├── router/       # 路由配置
│   │   ├── services/     # API服务
│   │   │   └── api.ts    # 后端通信API客户端
│   │   ├── store/        # 状态管理
│   │   │   └── useGameStore.ts # 游戏状态（支持云同步）
│   │   ├── styles/       # 样式文件
│   │   │   └── index.css # 主样式文件
│   │   ├── utils/        # 工具函数
│   │   ├── App.tsx       # 应用根组件
│   │   ├── main.tsx      # 应用入口
│   │   └── vite-env.d.ts # Vite类型声明
│   ├── .eslintrc.json    # ESLint配置
│   ├── .prettierrc       # Prettier配置
│   ├── index.html        # HTML入口文件
│   ├── package.json      # 依赖和脚本
│   ├── postcss.config.js # PostCSS配置
│   ├── tailwind.config.js # Tailwind配置
│   ├── tsconfig.json     # TypeScript配置
│   ├── tsconfig.node.json # Node.js的TypeScript配置
│   └── vite.config.ts    # Vite配置
├── server/               # 后端应用
│   ├── src/              # 源代码
│   │   ├── config/       # 配置文件
│   │   │   └── db.ts     # 数据库配置
│   │   ├── controllers/  # 请求处理器
│   │   │   ├── authController.ts # 认证控制器
│   │   │   └── gameDataController.ts # 游戏数据控制器
│   │   ├── middlewares/  # 中间件
│   │   │   ├── authMiddleware.ts # 认证中间件
│   │   │   └── errorHandler.ts # 错误处理中间件
│   │   ├── models/       # 数据库模型
│   │   │   ├── User.ts   # 用户模型
│   │   │   ├── GameData.ts # 游戏数据模型
│   │   │   └── VerificationCode.ts # 验证码模型
│   │   ├── routes/       # API路由
│   │   │   ├── authRoutes.ts # 认证路由
│   │   │   ├── gameDataRoutes.ts # 游戏数据路由
│   │   │   └── index.ts  # 主路由
│   │   ├── services/     # 业务逻辑
│   │   ├── types/        # 类型定义
│   │   │   ├── express.d.ts # Express类型扩展
│   │   │   └── index.ts  # 通用类型
│   │   ├── utils/        # 工具函数
│   │   └── index.ts      # 应用入口
│   ├── tests/            # 测试文件
│   ├── .env.example      # 环境变量示例
│   ├── package.json      # 依赖和脚本
│   └── tsconfig.json     # TypeScript配置
├── mobile/               # 移动应用
│   ├── src/              # 源代码
│   ├── resources/        # 移动应用资源（图标、启动屏等）
│   ├── config/           # 移动应用配置
│   ├── www/              # 构建后的Web应用（由client构建生成）
│   ├── android/          # Android平台代码（由Capacitor生成）
│   ├── ios/              # iOS平台代码（由Capacitor生成）
│   ├── capacitor.config.ts # Capacitor配置
│   └── package.json      # 依赖和脚本
├── .github/              # GitHub配置
├── .gitignore            # Git忽略文件
├── CODE_OF_CONDUCT.md    # 行为准则
├── CONTRIBUTING.md       # 本文件（贡献指南）
├── development_plan.md   # 开发计划
├── LICENSE               # 许可证
├── package.json          # 项目根配置
├── PROJECT_STRUCTURE.md  # 项目结构说明
└── README.md             # 项目说明
```

### 贡献类型

- 错误修复
- 新游戏实现
- 使用DaisyUI组件的UI/UX改进
- 文档改进
- 翻译
- 移动平台优化
- 性能增强
- 用户认证和安全性改进
- 服务器端API集成
- 数据库优化

### 许可证

通过向《这个棋盘不一般》贡献，您同意您的贡献将根据项目的[知识共享署名-非商业性-相同方式共享 4.0 国际许可协议](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans)进行许可，并归属于*UnusualChessboard* Development Group | 《这个棋盘不一般》开发团队。