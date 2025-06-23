/**
 * 游戏数据服务
 * 提供游戏列表和分类信息
 */

export interface Game {
  id: string;
  nameKey: string; // 国际化名称键名
  descriptionKey: string; // 国际化描述键名
  image?: string;
  category: 'chess' | 'board' | 'casual';
  available: boolean;
  comingSoon?: boolean;
}

// 游戏列表数据
const gamesList: Game[] = [
  // 棋类游戏
  {
    id: 'chess',
    nameKey: 'games.chess.name',
    descriptionKey: 'games.chess.description',
    image: '/images/games/chess.jpg', // 这里需要添加实际的图片
    category: 'chess',
    available: true,
  },
  {
    id: 'chinese-chess',
    nameKey: 'games.chinese_chess.name',
    descriptionKey: 'games.chinese_chess.description',
    image: '/images/games/chinese-chess.jpg',
    category: 'chess',
    available: true,
  },
  {
    id: 'shogi',
    nameKey: 'games.shogi.name',
    descriptionKey: 'games.shogi.description',
    category: 'chess',
    available: false,
    comingSoon: true,
  },
  {
    id: 'makruk',
    nameKey: 'games.makruk.name',
    descriptionKey: 'games.makruk.description',
    category: 'chess',
    available: false,
    comingSoon: true,
  },

  // 棋盘游戏
  {
    id: 'go',
    nameKey: 'games.go.name',
    descriptionKey: 'games.go.description',
    image: '/images/games/go.jpg',
    category: 'board',
    available: true,
  },
  {
    id: 'gobang',
    nameKey: 'games.gobang.name',
    descriptionKey: 'games.gobang.description',
    image: '/images/games/gobang.jpg',
    category: 'board',
    available: true,
  },
  {
    id: 'reversi',
    nameKey: 'games.reversi.name',
    descriptionKey: 'games.reversi.description',
    category: 'board',
    available: false,
    comingSoon: true,
  },
  {
    id: 'checkers',
    nameKey: 'games.checkers.name',
    descriptionKey: 'games.checkers.description',
    category: 'board',
    available: false,
    comingSoon: true,
  },

  // 休闲游戏
  {
    id: 'sheep',
    nameKey: 'games.sheep.name',
    descriptionKey: 'games.sheep.description',
    category: 'casual',
    available: false,
    comingSoon: true,
  },
  {
    id: 'snake',
    nameKey: 'games.snake.name',
    descriptionKey: 'games.snake.description',
    category: 'casual',
    available: false,
    comingSoon: true,
  },
  {
    id: 'jump',
    nameKey: 'games.jump.name',
    descriptionKey: 'games.jump.description',
    category: 'casual',
    available: false,
    comingSoon: true,
  },
  {
    id: '2048',
    nameKey: 'games.2048.name',
    descriptionKey: 'games.2048.description',
    category: 'casual',
    available: false,
    comingSoon: true,
  },
];

/**
 * 获取所有游戏列表
 */
export const getAllGames = (): Game[] => {
  return gamesList;
};

/**
 * 按分类获取游戏
 */
export const getGamesByCategory = (category: Game['category']): Game[] => {
  return gamesList.filter(game => game.category === category);
};

/**
 * 获取可用的游戏
 */
export const getAvailableGames = (): Game[] => {
  return gamesList.filter(game => game.available);
};

/**
 * 按ID获取游戏
 */
export const getGameById = (id: string): Game | undefined => {
  return gamesList.find(game => game.id === id);
};

/**
 * 获取游戏分类
 */
export const getCategories = (): { id: Game['category']; nameKey: string }[] => {
  return [
    { id: 'chess', nameKey: 'games.categories.chess' },
    { id: 'board', nameKey: 'games.categories.board' },
    { id: 'casual', nameKey: 'games.categories.casual' },
  ];
};

export default {
  getAllGames,
  getGamesByCategory,
  getAvailableGames,
  getGameById,
  getCategories,
}; 