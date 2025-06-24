# UnusualChessboard | 这个棋盘不一般

[English](#unusual-chessboard) | [中文](#这个棋盘不一般)

## UnusualChessboard

A multi-platform application integrating 28 classic board games and casual mini-games, supporting both English and Chinese interfaces, and offering multiple game modes.

### Features

- Multi-platform support: Web, iOS, Android, HarmonyOS
- Rich game collection: 28 classic board games and casual mini-games
- Multiple game modes: Player vs AI, Player vs Player, AI vs AI
- Bilingual interface (English/Chinese)
- Modern UI with DaisyUI components
- User system: Email registration, verification codes, password management
- Cloud data synchronization
- Growth score system: Only counts scores from Player vs AI games
- API security with two-factor authentication
- **Performance optimized**: Lazy loading, code splitting, error boundaries
- **Type-safe**: Complete TypeScript type system
- **Modern architecture**: Optimized build configuration and state management

### Tech Stack

- **Frontend**:
  - React 19.1.0 + TypeScript 5.8.3
  - Vite 6.3.5 (build tool with optimized configuration)
  - DaisyUI 5.0.43 (Tailwind CSS-based component library)
  - i18next 25.2.1 (internationalization)
  - Zustand 5.0.5 (state management)
  - React Router 7.6.2 (routing with lazy loading)
  - Axios 1.10.0 (HTTP client with interceptors)
  - Tailwind CSS 3.4.0 (utility-first CSS framework)

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
  - ESLint 9.29.0 (code linting)
  - Prettier 3.6.0 (code formatting)
  - Terser (code minification)
  - TypeScript strict mode enabled

### Project Structure

For detailed project structure, please refer to the [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) file.

### Quick Start

#### Install Dependencies

```bash
npm install
```

#### Start Development Server

```bash
npm run dev
```

#### Build Project

```bash
npm run build
```

#### Start Production Server

```bash
npm run start
```

#### Clean Dependencies (If Needed)

```bash
npm run clean
```

### Mobile App Development

#### Add Platforms

```bash
npm run cap:add:android --workspace=mobile  # Add Android platform
npm run cap:add:ios --workspace=mobile      # Add iOS platform
```

#### Build and Sync

```bash
npm run build:mobile
```

#### Open Platform IDE

```bash
npm run cap:open:android --workspace=mobile  # Open Android Studio
npm run cap:open:ios --workspace=mobile      # Open Xcode
```

### Performance Features

- **Code Splitting**: Automatic chunk splitting for optimal loading
- **Lazy Loading**: Route-based component lazy loading
- **Error Boundaries**: Comprehensive error handling and recovery
- **Type Safety**: 95%+ TypeScript coverage with strict typing
- **Build Optimization**: Terser minification and asset optimization
- **Performance Monitoring**: Development-time performance tracking

### Version Plans

#### Version 1.0 (Current)

- Basic game functionality
- Multiple game modes:
  - Player vs AI (counts towards growth score)
  - Player vs Player
  - AI vs AI (spectator mode, doesn't count towards growth score)
  - 3-player games with AI filling in (doesn't count towards growth score)
- User system with email registration (supported domains: gmail.com, outlook.com, hotmail.com, qq.com, 163.com, 126.com, yahoo.com, icloud.com, mail.ru, aol.com, gmx.com, mail.com)
- Email verification for registration and password recovery
- User profile management (nickname, avatar, etc.)
- Cloud data synchronization
- API security with two-factor authentication (optional)
- **Performance optimizations and modern architecture**

#### Version 2.0 (Planned)

- Enhanced multiplayer features
- Advanced AI opponents
- Leaderboards
- Social features
- Tournament system

### Free API Resources and AI Platforms

#### API Platforms
- **[ExpLinks API HUB](https://www.explinks.com/)**: A leading API integration platform in China, aggregating a large number of truly free APIs.
- **[RapidAPI](https://rapidapi.com/hub)**: A leading API platform that gathers thousands of APIs from different providers, covering a wide range of fields.
- **[GitHub public-apis](https://github.com/public-apis/)**: This GitHub repository provides a carefully curated list of free APIs for software and web development.
- **[ShanHe API](https://api.shanhe.kim/)**: Provides stable and fast free API data interface services, with servers using high-level protection in China for stable operation.
- **[YesAPI](http://api.yesapi.cn/)**: A free, development-free, directly usable open platform.
- **[ProgrammableWeb](https://www.programmableweb.com/)**: A common resource for API enthusiasts, providing a wide directory of free and paid APIs.

#### AI Model Platforms
- **[Moonshot Kimi](https://www.moonshot.cn/)**: Provides free access to AI models. [API Console](https://platform.moonshot.cn/console)
- **[Tsinghua Zhipu AI](https://open.bigmodel.cn/)**: All models come with free quotas.
- **[Baichuan Intelligence](https://www.baichuan-ai.com/)**: Provides 80 yuan credit for new users. API endpoint: api.baichuan-ai.com/v1
- **[iFlytek Spark](https://xinghuo.xfyun.cn/)**: Spark Lite model is completely free, other models have gifted quotas.
- **[SiliconFlow](https://cloud.siliconflow.cn/models)**: Offers R1, V3 and other models, with 14 yuan trial credit for new users.
- **[Cloudflare](https://developers.cloudflare.com/workers-ai/)**: AI services include Workers AI and AI Gateway, with REST API and Worker applications sharing 100,000 free calls per day.
- **[OpenRouter](https://www.openrouter.ai)**: Free access to DeepSeek API and others.
- **[Google AI Studio](https://ai.google.dev/)**: Provides free usage of Gemini Pro and other models, supporting 32K text context window.
- **[AGICTO](https://agic.to/)**: Provides access to over 50 mainstream AI models, allowing easy access to multiple leading AI companies' models with a single account.
- **[Jeniya](https://www.jeniya.xyz/)**: Provides API access to Deepseek API, ChatGPT API, Claude API and other mainstream AI models, with free quotas included.

### Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) to learn how to contribute to this project.

### Code of Conduct

Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) to understand the project's code of conduct.

### License

This project is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/) - see the [LICENSE](LICENSE) file for details.

### Authors

- *UnusualChessboard* Development Group

### Repository

- **GitHub**: [https://github.com/ThatMrBen/UnusualChessboard](https://github.com/ThatMrBen/UnusualChessboard)

---

## 这个棋盘不一般

一个集成了28种经典棋盘游戏和休闲小游戏的多平台应用，支持中英文双语界面，提供多种游戏模式。

### 项目特点

- 多平台支持：网页版、iOS、Android、鸿蒙系统应用
- 丰富的游戏集合：28种经典棋盘游戏和休闲小游戏
- 多种游戏模式：玩家对战AI、玩家对战玩家、AI对战AI
- 中英文双语界面
- 现代化UI：使用DaisyUI组件库
- 用户系统：邮箱注册、验证码、密码管理
- 云端数据同步
- 成长分数系统：仅计入玩家对战AI的分数
- API安全的两步验证
- **性能优化**：懒加载、代码分割、错误边界
- **类型安全**：完整的TypeScript类型系统
- **现代架构**：优化的构建配置和状态管理

### 技术栈

- **前端**：
  - React 19.1.0 + TypeScript 5.8.3
  - Vite 6.3.5（优化的构建工具）
  - DaisyUI 5.0.43（基于Tailwind CSS的组件库）
  - i18next 25.2.1（国际化）
  - Zustand 5.0.5（状态管理）
  - React Router 7.6.2（带懒加载的路由）
  - Axios 1.10.0（带拦截器的HTTP客户端）
  - Tailwind CSS 3.4.0（实用优先的CSS框架）

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
  - ESLint 9.29.0（代码检查）
  - Prettier 3.6.0（代码格式化）
  - Terser（代码压缩）
  - TypeScript严格模式

### 项目结构

详细的项目结构请参考 [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) 文件。

### 快速开始

#### 安装依赖

```bash
npm install
```

#### 启动开发服务器

```bash
npm run dev
```

#### 构建项目

```bash
npm run build
```

#### 启动生产服务器

```bash
npm run start
```

#### 清理依赖（如需要）

```bash
npm run clean
```

### 移动应用开发

#### 添加平台

```bash
npm run cap:add:android --workspace=mobile  # 添加Android平台
npm run cap:add:ios --workspace=mobile      # 添加iOS平台
```

#### 构建和同步

```bash
npm run build:mobile
```

#### 打开平台IDE

```bash
npm run cap:open:android --workspace=mobile  # 打开Android Studio
npm run cap:open:ios --workspace=mobile      # 打开Xcode
```

### 性能特性

- **代码分割**：自动分块优化加载
- **懒加载**：基于路由的组件懒加载
- **错误边界**：全面的错误处理和恢复
- **类型安全**：95%+ TypeScript覆盖率，严格类型检查
- **构建优化**：Terser压缩和资源优化
- **性能监控**：开发时性能跟踪

### 版本计划

#### 版本 1.0（当前）

- 基础游戏功能
- 多种游戏模式：
  - 玩家对战AI（计入成长分数）
  - 玩家对战玩家
  - AI对战AI（观战模式，不计入成长分数）
  - 3人游戏AI补位（不计入成长分数）
- 邮箱注册用户系统（支持域名：gmail.com、outlook.com、hotmail.com、qq.com、163.com、126.com、yahoo.com、icloud.com、mail.ru、aol.com、gmx.com、mail.com）
- 注册和密码恢复的邮箱验证
- 用户资料管理（昵称、头像等）
- 云端数据同步
- API安全的两步验证（可选）
- **性能优化和现代架构**

#### 版本 2.0（计划中）

- 增强的多人在线功能
- 高级AI对手
- 排行榜
- 社交功能
- 锦标赛系统