/**
 * Mock数据服务
 * 在数据库连接失败时提供内存中的数据存储功能
 * 仅供开发环境使用
 */

// 内存存储
const memoryStore: { [key: string]: any } = {
  users: [],
  gameData: [],
  verificationCodes: [],
};

/**
 * 检查MongoDB连接状态
 * @returns 数据库是否已连接
 */
export const isDbConnected = (): boolean => {
  // 该函数将在app.ts中替换为真实的检查
  return false;
};

/**
 * 通用查询函数
 * @param collection 集合名称
 * @param query 查询条件
 * @returns 匹配条件的对象数组
 */
export const find = (collection: string, query: any = {}): any[] => {
  const data = memoryStore[collection] || [];
  
  // 简单的查询匹配
  return data.filter((item: any) => {
    for (const key in query) {
      if (query[key] !== item[key]) {
        return false;
      }
    }
    return true;
  });
};

/**
 * 通用查询单个文档函数
 * @param collection 集合名称
 * @param query 查询条件
 * @returns 匹配条件的第一个对象或null
 */
export const findOne = (collection: string, query: any = {}): any | null => {
  const results = find(collection, query);
  return results.length > 0 ? results[0] : null;
};

/**
 * 通用插入函数
 * @param collection 集合名称
 * @param document 要插入的文档
 * @returns 插入后的文档
 */
export const insertOne = (collection: string, document: any): any => {
  if (!memoryStore[collection]) {
    memoryStore[collection] = [];
  }
  
  // 生成简单的ID
  const newDoc = {
    ...document,
    _id: `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  memoryStore[collection].push(newDoc);
  return newDoc;
};

/**
 * 通用更新函数
 * @param collection 集合名称
 * @param query 查询条件
 * @param update 更新内容
 * @returns 更新后的文档
 */
export const updateOne = (collection: string, query: any, update: any): any | null => {
  if (!memoryStore[collection]) {
    return null;
  }
  
  const index = memoryStore[collection].findIndex((item: any) => {
    for (const key in query) {
      if (query[key] !== item[key]) {
        return false;
      }
    }
    return true;
  });
  
  if (index === -1) {
    return null;
  }
  
  const updatedDoc = {
    ...memoryStore[collection][index],
    ...update,
    updatedAt: new Date(),
  };
  
  memoryStore[collection][index] = updatedDoc;
  return updatedDoc;
};

/**
 * 通用删除函数
 * @param collection 集合名称
 * @param query 查询条件
 * @returns 删除的文档数量
 */
export const deleteOne = (collection: string, query: any): { deletedCount: number } => {
  if (!memoryStore[collection]) {
    return { deletedCount: 0 };
  }
  
  const initialLength = memoryStore[collection].length;
  memoryStore[collection] = memoryStore[collection].filter((item: any) => {
    for (const key in query) {
      if (query[key] === item[key]) {
        return false;
      }
    }
    return true;
  });
  
  return { deletedCount: initialLength - memoryStore[collection].length };
};

/**
 * 初始化示例数据
 */
export const initializeMockData = (): void => {
  console.log('初始化Mock数据...');
  
  // 清除所有数据
  Object.keys(memoryStore).forEach(key => {
    memoryStore[key] = [];
  });
  
  // 添加示例用户
  insertOne('users', {
    name: '示例用户',
    email: 'demo@example.com',
    password: '$2a$10$X7RsyT7SePjyFabzYx8WgeEqM2lQV/ZWym5bLLQs4KFLIXqbYZDFa', // 'password123'
    role: 'user',
    gameData: {
      growthScore: 100,
      preferences: {},
      gameProgress: {},
      savedGames: {}
    },
    security: {
      twoFactorEnabled: false,
      apiAccessEnabled: false
    }
  });
  
  // 添加示例游戏数据
  insertOne('gameData', {
    userId: 'mock_user_id',
    gameType: 'chess',
    data: {
      history: [
        {
          score: 10,
          timestamp: new Date(),
          gameMode: 'player-vs-ai'
        }
      ],
      settings: {
        difficulty: 'medium'
      }
    },
    lastUpdated: new Date()
  });
  
  console.log('Mock数据初始化完成');
};

// 导出模块
export default {
  isDbConnected,
  find,
  findOne,
  insertOne,
  updateOne,
  deleteOne,
  initializeMockData,
}; 