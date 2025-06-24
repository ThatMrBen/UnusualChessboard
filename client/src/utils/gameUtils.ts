/**
 * 游戏工具函数
 * 提供游戏列表、按ID/分类查找等工具
 */

/**
 * 获取游戏列表
 * @returns 游戏列表
 */
export const getGameList = () => {
  return [
    {
      id: 'chess',
      name: 'Chess',
      category: 'chess',
      description: 'International Chess',
      thumbnail: '/games/chess/thumbnail.jpg',
    },
    {
      id: 'chinese-chess',
      name: 'Chinese Chess',
      category: 'chess',
      description: 'Xiangqi',
      thumbnail: '/games/chinese-chess/thumbnail.jpg',
    },
    {
      id: 'gobang',
      name: 'Gobang',
      category: 'board',
      description: 'Five in a Row',
      thumbnail: '/games/gobang/thumbnail.jpg',
    },
    {
      id: 'go',
      name: 'Go',
      category: 'board',
      description: 'Weiqi',
      thumbnail: '/games/go/thumbnail.jpg',
    },
    // 更多游戏将在这里添加
  ];
};

/**
 * 根据ID获取游戏
 * @param id 游戏ID
 * @returns 游戏信息
 */
export const getGameById = (id: string) => {
  return getGameList().find((game) => game.id === id);
};

/**
 * 根据类别获取游戏
 * @param category 游戏类别
 * @returns 游戏列表
 */
export const getGamesByCategory = (category: string) => {
  return getGameList().filter((game) => game.category === category);
}; 