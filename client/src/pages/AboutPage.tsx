import React from 'react';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';

/**
 * 关于页面
 * 展示项目信息、团队信息和贡献指南
 */
const AboutPage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader title={t('nav.about')} />
      
      <div className="prose prose-lg max-w-none">
        <section className="mb-10">
          <h2>UnusualChessboard | 这个棋盘不一般</h2>
          <p>
            UnusualChessboard是一个多平台国际象棋和棋盘游戏合集。项目旨在提供各种经典和非传统的棋类游戏，
            支持Web、移动和桌面平台，为棋类游戏爱好者提供丰富的游戏体验。
          </p>
        </section>
        
        <section className="mb-10">
          <h2>项目特点</h2>
          <ul>
            <li>多种棋类和棋盘游戏，包括国际象棋、中国象棋、围棋等</li>
            <li>支持Web、移动和桌面多平台</li>
            <li>支持多种界面主题和多语言</li>
            <li>AI对战和在线多人对战功能</li>
            <li>游戏记录和回放功能</li>
          </ul>
        </section>
        
        <section className="mb-10">
          <h2>技术栈</h2>
          <ul>
            <li>前端：React、TypeScript、TailwindCSS</li>
            <li>移动端：Capacitor</li>
            <li>后端：Node.js、Express</li>
            <li>数据库：MongoDB</li>
          </ul>
        </section>
        
        <section className="mb-10">
          <h2>团队信息</h2>
          <p>
            本项目由燧石核心开发部门（flintcore Development Department）开发。
          </p>
          <p>
            GitHub仓库：<a href="https://github.com/ThatMrBen/UnusualChessboard" target="_blank" rel="noopener noreferrer">
              https://github.com/ThatMrBen/UnusualChessboard
            </a>
          </p>
        </section>
        
        <section className="mb-10">
          <h2>许可协议</h2>
          <p>
            本项目采用知识共享署名-非商业性-相同方式共享 4.0 国际许可协议（CC BY-NC-SA 4.0）。
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage; 