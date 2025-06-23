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

### Tech Stack

- **Frontend**:
  - React + TypeScript
  - Vite (build tool)
  - DaisyUI (Tailwind CSS-based component library)
  - i18next (internationalization)
  - Zustand (state management)
  - React Router (routing)
  - Axios (HTTP client)

- **Backend**:
  - Node.js + TypeScript
  - Express (web framework)
  - MongoDB + Mongoose (database)
  - JWT (authentication)
  - Nodemailer (email service)
  - Winston (logging)
  - Bcrypt (password hashing)

- **Mobile App**:
  - Capacitor (cross-platform mobile app framework)
  - Support for iOS, Android, and HarmonyOS

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

- **flintcore Development Department | 燧石核心开发部门**
- **ThatMrBen | 本先森Ben**

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

### 技术栈

- **前端**：
  - React + TypeScript
  - Vite（构建工具）
  - DaisyUI（基于Tailwind CSS的组件库）
  - i18next（国际化）
  - Zustand（状态管理）
  - React Router（路由）
  - Axios（HTTP客户端）

- **后端**：
  - Node.js + TypeScript
  - Express（Web框架）
  - MongoDB + Mongoose（数据库）
  - JWT（身份验证）
  - Nodemailer（邮件服务）
  - Winston（日志）
  - Bcrypt（密码哈希）

- **移动应用**：
  - Capacitor（跨平台移动应用框架）
  - 支持iOS、Android和鸿蒙系统

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

#### Clean Dependencies (If Needed)

```bash
npm run clean
```

### 移动应用开发

#### 添加平台

```bash
npm run cap:add:android --workspace=mobile  # 添加Android平台
npm run cap:add:ios --workspace=mobile      # 添加iOS平台
```

#### 构建并同步

```bash
npm run build:mobile
```

#### 打开平台IDE

```bash
npm run cap:open:android --workspace=mobile  # 打开Android Studio
npm run cap:open:ios --workspace=mobile      # 打开Xcode
```

### 版本计划

#### 1.0版本（当前）

- 基础游戏功能
- 多种游戏模式：
  - 玩家对战AI（计入成长分数）
  - 玩家对战玩家
  - AI对战AI（观战模式，不计入成长分数）
  - 三人游戏中AI补充（不计入成长分数）
- 邮箱注册的用户系统（支持的域名：gmail.com, outlook.com, hotmail.com, qq.com, 163.com, 126.com, yahoo.com, icloud.com, mail.ru, aol.com, gmx.com, mail.com）
- 注册和密码恢复的邮箱验证
- 用户资料管理（昵称、头像等）
- 云端数据同步
- API安全的两步验证（可选）

#### 2.0版本（计划中）

- 增强的多人游戏功能
- 高级AI对手
- 排行榜
- 社交功能
- 锦标赛系统

### 免费API资源和AI平台

#### API平台
- **[幂简集成 API HUB](https://www.explinks.com/)**：国内领先的API接口平台，汇总了大量真正免费的API。
- **[RapidAPI](https://rapidapi.com/hub)**：领先的API平台，汇集了数千个来自不同提供商的API，涵盖广泛领域。
- **[GitHub public-apis](https://github.com/public-apis/)**：该GitHub仓库提供了精心整理的免费API列表，供软件和网页开发使用。
- **[山河API](https://api.shanhe.kim/)**：提供稳定、快速的免费API数据接口服务，服务器采用国内高防，稳定运行。
- **[果创云 - 小白接口](http://api.yesapi.cn/)**：免费、免开发、直接可用的开放式平台。
- **[ProgrammableWeb](https://www.programmableweb.com/)**：是API爱好者的常用资源，提供免费和付费API的广泛目录。

#### AI模型平台
- **[月之暗面 Kimi](https://www.moonshot.cn/)**：提供免费AI模型访问。[API控制台](https://platform.moonshot.cn/console)
- **[清华智谱 AI](https://open.bigmodel.cn/)**：各模型均有免费额度。
- **[百川智能](https://www.baichuan-ai.com/)**：为新用户提供80元额度。API接口地址：api.baichuan-ai.com/v1
- **[讯飞星火](https://xinghuo.xfyun.cn/)**：Spark Lite模型完全免费，其他模型有赠送额度。
- **[硅基流动](https://cloud.siliconflow.cn/models)**：提供R1、V3等模型，新用户有14元体验额度。
- **[Cloudflare](https://developers.cloudflare.com/workers-ai/)**：AI服务包括Workers AI和AI Gateway，REST API和Worker应用共享每天10万次的免费调用额度。
- **[OpenRouter](https://www.openrouter.ai)**：可免费使用DeepSeek API等。
- **[Google AI Studio](https://ai.google.dev/)**：提供Gemini Pro等模型的免费使用，支持32K文本上下文窗口。
- **[AGICTO](https://agic.to/)**：提供超过50个主流AI模型的调用服务，一个账号即可轻松调用多家领先AI公司的模型。
- **[Jeniya](https://www.jeniya.xyz/)**：提供Deepseek API、ChatGPT API、Claude API等主流AI模型的API调用服务，包含免费额度。

### 贡献指南

请阅读 [CONTRIBUTING.md](CONTRIBUTING.md) 了解如何为项目做出贡献。

### 行为准则

请阅读 [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) 了解项目的行为准则。

### 许可证

本项目采用 [知识共享署名-非商业性-相同方式共享 4.0 国际许可协议](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans) 进行许可 - 详情请参阅 [LICENSE](LICENSE) 文件。

### 作者

- **flintcore Development Department | 燧石核心开发部门**
- **ThatMrBen | 本先森Ben**

### 仓库

- **GitHub**: [https://github.com/ThatMrBen/UnusualChessboard](https://github.com/ThatMrBen/UnusualChessboard)