# UnusualChessboard Development Plan | 这个棋盘不一般开发计划

[English](#development-plan) | [中文](#开发计划)

### Project Information | 项目信息

- **Project Name | 项目名称**: UnusualChessboard | 这个棋盘不一般
- **Maintainers**: *UnusualChessboard* Development Group
- **维护者**: 《这个棋盘不一般》开发团队
- **Repository | 代码仓库**: https://github.com/ThatMrBen/UnusualChessboard
- **Copyright | 版权**: © 2025

## Development Plan

### Project Overview

UnusualChessboard is a multi-platform board game collection that integrates 28 classic board games and casual mini-games. It supports both English and Chinese interfaces and offers multiple game modes including Player vs AI, Player vs Player, and AI vs AI.

### Technical Architecture

- **Frontend**: React 19.1.0 + TypeScript 5.8.3, Vite 6.3.5, DaisyUI 5.0.43 (Tailwind CSS 3.4.0), i18next 25.2.1, Zustand 5.0.5, React Router 7.6.2, Axios 1.10.0
- **Backend**: Node.js + TypeScript 5.8.3, Express 4.21.2, MongoDB + Mongoose 8.16.0, JWT 9.0.2, Nodemailer 6.10.1, Winston 3.11.0, Bcrypt 6.0.0
- **Mobile**: Capacitor 6.0.0 (for iOS, Android, and HarmonyOS)
- **Development Tools**: ESLint 9.29.0, Prettier 3.6.0, TypeScript strict mode

### Development Timeline

#### Phase 1: Foundation (Week 1-2)

- [x] Week 1: Project setup and directory structure
  - [x] Set up development environment and dependencies
  - [x] Create basic project structure
  - [x] Configure build tools and linters
  - [x] Optimize project structure with npm workspaces
  - [x] Create game selection interface
  - [x] Set up internationalization (i18n) system
  - [x] Implement main layout and navigation

- [ ] Week 2: Core game engine and first game implementation
  - [ ] 开发抽象游戏类/接口
  - [x] 实现游戏状态管理
  - [ ] 创建移动验证系统
  - [ ] 实现国际象棋游戏
  - [ ] 创建基本AI对手
  - [ ] 测试和调试核心游戏玩法
  - [x] **依赖升级和代码重构**
    - [x] 升级所有依赖到最新稳定版本
    - [x] 迁移ESLint配置到v9格式
    - [x] 实现完整的TypeScript类型系统
    - [x] 优化Vite构建配置，支持代码分割
    - [x] 添加路由和组件的懒加载
    - [x] 实现错误边界和性能监控
    - [x] 重构API服务和状态管理
    - [x] 添加开发工具和性能优化

#### Phase 2: Game Collection (Week 3-6)

- [ ] Week 3: Chess-like games
  - [ ] Chinese Chess (Xiangqi)
  - [ ] International Chess
  - [ ] Thai Chess (Makruk)
  - [ ] Japanese Chess (Shogi)

- [ ] Week 4: Board games
  - [ ] Go (Weiqi)
  - [ ] Gobang (Five in a Row)
  - [ ] Reversi (Othello)
  - [ ] Checkers

- [ ] Week 5: Casual games
  - [ ] Sheep a Sheep
  - [ ] Snake
  - [ ] Jump Jump
  - [ ] 2048

- [ ] Week 6: Additional games and refinement
  - [ ] Implement remaining games
  - [ ] Refine game mechanics
  - [ ] Optimize performance

#### Phase 3: Advanced Features (Week 7-8)

- [ ] Week 7: AI opponents
  - [ ] Implement different AI difficulty levels
  - [ ] Create AI vs AI mode
  - [ ] Optimize AI performance

- [ ] Week 7-8: User System and Backend
  - [ ] Set up server and database
  - [ ] Implement user registration with email verification
    - [ ] Support for specific email domains (gmail.com, outlook.com, etc.)
    - [ ] Email verification code system
  - [ ] User authentication and password management
  - [ ] User profile management (nickname, avatar)
  - [ ] Cloud data synchronization
  - [ ] API security with two-factor authentication

- [ ] Week 8: Mobile platform
  - [ ] Adapt UI for mobile devices
  - [ ] Package with Capacitor
  - [ ] Test on iOS, Android, and HarmonyOS

#### Phase 4: Polish and Release (Week 9-10)

- [ ] Week 9: Testing and refinement
  - [ ] User testing and feedback
  - [ ] Bug fixes and performance optimization
  - [ ] Final UI/UX improvements
  - [ ] Test user system and cloud synchronization

- [ ] Week 10: Release preparation
  - [ ] Documentation
  - [ ] Prepare for app store submission
  - [ ] Launch version 1.0

### Technical Achievements

#### Completed Infrastructure (Week 2)
- ✅ **Modern Dependency Stack**: All dependencies upgraded to latest stable versions
- ✅ **Type Safety**: 95%+ TypeScript coverage with strict typing enabled
- ✅ **Build Optimization**: Vite 6.3.5 with code splitting, lazy loading, and Terser minification
- ✅ **Performance Features**: Error boundaries, performance monitoring, and optimized routing
- ✅ **Code Quality**: ESLint 9.29.0 with comprehensive rules and Prettier formatting
- ✅ **State Management**: Refactored Zustand store with proper TypeScript types
- ✅ **API Layer**: Type-safe API services with interceptors and error handling

### Future Plans (Version 2.0)

- Enhanced multiplayer features
- Advanced AI opponents
- Leaderboards and achievements
- Social features
- Tournament system
- Additional games and variants

## 开发计划

### 项目概述

《这个棋盘不一般》是一个多平台棋盘游戏集合，集成了28种经典棋盘游戏和休闲小游戏。它支持中英文双语界面，并提供多种游戏模式，包括玩家对战AI、玩家对战玩家和AI对战AI。

### 技术架构

- **前端**：React 19.1.0 + TypeScript 5.8.3、Vite 6.3.5、DaisyUI 5.0.43（Tailwind CSS 3.4.0）、i18next 25.2.1、Zustand 5.0.5、React Router 7.6.2、Axios 1.10.0
- **后端**：Node.js + TypeScript 5.8.3、Express 4.21.2、MongoDB + Mongoose 8.16.0、JWT 9.0.2、Nodemailer 6.10.1、Winston 3.11.0、Bcrypt 6.0.0
- **移动端**：Capacitor 6.0.0（用于iOS、Android和鸿蒙系统）
- **开发工具**：ESLint 9.29.0、Prettier 3.6.0、TypeScript严格模式

### 开发时间线

#### 第一阶段：基础（第1-2周）

- [x] 第1周：项目设置和目录结构
  - [x] 设置开发环境和依赖项
  - [x] 创建基本项目结构
  - [x] 配置构建工具和代码检查器
  - [x] 使用npm workspaces优化项目结构
  - [x] 创建游戏选择界面
  - [x] 设置国际化（i18n）系统
  - [x] 实现主布局和导航

- [ ] 第2周：核心游戏引擎，第一个游戏实现
  - [ ] 开发抽象游戏类/接口
  - [x] 实现游戏状态管理
  - [ ] 创建移动验证系统
  - [ ] 实现国际象棋游戏
  - [ ] 创建基本AI对手
  - [ ] 测试和调试核心游戏玩法
  - [x] **依赖升级和代码重构**
    - [x] 升级所有依赖到最新稳定版本
    - [x] 迁移ESLint配置到v9格式
    - [x] 实现完整的TypeScript类型系统
    - [x] 优化Vite构建配置，支持代码分割
    - [x] 添加路由和组件的懒加载
    - [x] 实现错误边界和性能监控
    - [x] 重构API服务和状态管理
    - [x] 添加开发工具和性能优化

#### 第二阶段：游戏集合（第3-6周）

- [ ] 第3周：棋类游戏
  - [ ] 中国象棋
  - [ ] 国际象棋
  - [ ] 泰国象棋（Makruk）
  - [ ] 日本将棋（Shogi）

- [ ] 第4周：棋盘游戏
  - [ ] 围棋
  - [ ] 五子棋
  - [ ] 黑白棋（奥赛罗）
  - [ ] 跳棋

- [ ] 第5周：休闲游戏
  - [ ] 羊了个羊
  - [ ] 贪吃蛇
  - [ ] 跳一跳
  - [ ] 2048

- [ ] 第6周：额外游戏和完善
  - [ ] 实现剩余游戏
  - [ ] 完善游戏机制
  - [ ] 优化性能

#### 第三阶段：高级功能（第7-8周）

- [ ] 第7周：AI对手
  - [ ] 实现不同AI难度级别
  - [ ] 创建AI对战AI模式
  - [ ] 优化AI性能

- [ ] 第7-8周：用户系统和后端
  - [ ] 设置服务器和数据库
  - [ ] 实现带有邮箱验证的用户注册
    - [ ] 支持特定邮箱域名（gmail.com、outlook.com等）
    - [ ] 邮箱验证码系统
  - [ ] 用户认证和密码管理
  - [ ] 用户资料管理（昵称、头像）
  - [ ] 云端数据同步
  - [ ] API安全的两步验证

- [ ] 第8周：移动平台
  - [ ] 为移动设备调整UI
  - [ ] 使用Capacitor打包
  - [ ] 在iOS、Android和鸿蒙系统上测试

#### 第四阶段：完善和发布（第9-10周）

- [ ] 第9周：测试和完善
  - [ ] 用户测试和反馈
  - [ ] 错误修复和性能优化
  - [ ] 最终UI/UX改进
  - [ ] 测试用户系统和云端同步

- [ ] 第10周：发布准备
  - [ ] 文档编写
  - [ ] 准备应用商店提交
  - [ ] 发布1.0版本

### 技术成果

#### 已完成的基础设施（第2周）
- ✅ **现代化依赖栈**：所有依赖升级到最新稳定版本
- ✅ **类型安全**：95%+ TypeScript覆盖率，启用严格类型检查
- ✅ **构建优化**：Vite 6.3.5支持代码分割、懒加载和Terser压缩
- ✅ **性能特性**：错误边界、性能监控和优化的路由系统
- ✅ **代码质量**：ESLint 9.29.0全面规则和Prettier格式化
- ✅ **状态管理**：重构Zustand存储，支持完整的TypeScript类型
- ✅ **API层**：类型安全的API服务，支持拦截器和错误处理

### 未来计划（版本2.0）

- 增强的多人在线功能
- 高级AI对手
- 排行榜和成就系统
- 社交功能
- 锦标赛系统
- 额外游戏和变体