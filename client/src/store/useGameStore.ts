import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '../services/api';
import apiService from '../services/api';

// 游戏状态管理
// 使用Zustand管理游戏状态，并支持持久化和云同步

interface GameState {
  // 游戏设置
  // 当前选择的游戏、游戏模式和难度级别
  currentGame: string | null;
  gameMode: 'player-vs-ai' | 'player-vs-player' | 'ai-vs-ai' | 'three-player' | null;
  difficulty: 'easy' | 'medium' | 'hard' | null;
  
  // 用户数据
  // 用户登录状态、个人信息和认证令牌
  isLoggedIn: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    growthScore: number;
  } | null;
  token: string | null;
  
  // 游戏进度
  // 存储各种游戏的进度、存档和用户偏好设置
  gameProgress: Record<string, any>;
  savedGames: Record<string, any>;
  preferences: Record<string, any>;
  
  // 云同步状态
  // 跟踪与服务器的数据同步状态
  syncStatus: 'synced' | 'pending' | 'failed' | 'offline';
  lastSynced: Date | null;
  
  // 游戏设置操作
  setCurrentGame: (game: string | null) => void;
  setGameMode: (mode: 'player-vs-ai' | 'player-vs-player' | 'ai-vs-ai' | 'three-player' | null) => void;
  setDifficulty: (level: 'easy' | 'medium' | 'hard' | null) => void;
  resetGame: () => void;
  
  // 用户操作
  login: (userData: any, token: string) => void;
  logout: () => void;
  updateUser: (userData: Partial<GameState['user']>) => void;
  updateGrowthScore: (score: number) => void;
  
  // 游戏进度操作
  saveGameProgress: (gameType: string, progress: any) => void;
  saveGame: (gameType: string, saveData: any) => void;
  updatePreferences: (prefs: Record<string, any>) => void;
  
  // 云同步操作
  syncWithCloud: () => Promise<void>;
  setSyncStatus: (status: GameState['syncStatus']) => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // 游戏设置
      currentGame: null,
      gameMode: null,
      difficulty: null,
      
      // 用户数据
      isLoggedIn: false,
      user: null,
      token: null,
      
      // 游戏进度
      gameProgress: {},
      savedGames: {},
      preferences: {},
      
      // 云同步状态
      syncStatus: 'offline',
      lastSynced: null,
      
      // 游戏设置操作
      setCurrentGame: (game) => set({ currentGame: game }),
      setGameMode: (mode) => set({ gameMode: mode }),
      setDifficulty: (level) => set({ difficulty: level }),
      resetGame: () => set({ currentGame: null, gameMode: null, difficulty: null }),
      
      // 用户操作
      login: (userData, token) => {
        set({ 
          isLoggedIn: true, 
          user: userData, 
          token,
          syncStatus: 'pending'
        });
        // 登录后自动同步数据
        get().syncWithCloud();
      },
      logout: () => {
        set({ 
          isLoggedIn: false, 
          user: null, 
          token: null,
          syncStatus: 'offline'
        });
      },
      updateUser: (userData) => {
        if (!get().user) return;
        set({ user: { ...get().user!, ...userData } });
      },
      updateGrowthScore: (score) => {
        if (!get().user) return;
        
        // 更新本地分数
        set({ 
          user: { 
            ...get().user!, 
            growthScore: (get().user?.growthScore || 0) + score 
          } 
        });
        
        // 如果已登录，同步到服务器
        if (get().isLoggedIn && get().token) {
          apiService.gameData.updateGrowthScore({
            score,
            gameType: get().currentGame || 'unknown',
            gameMode: get().gameMode || 'player-vs-ai'
          }).catch((err: Error) => {
            console.error('Failed to update growth score:', err);
            set({ syncStatus: 'failed' });
          });
        }
      },
      
      // 游戏进度操作
      saveGameProgress: (gameType, progress) => {
        set({ 
          gameProgress: { 
            ...get().gameProgress, 
            [gameType]: progress 
          } 
        });
        
        // 如果已登录，尝试同步
        if (get().isLoggedIn) {
          set({ syncStatus: 'pending' });
          get().syncWithCloud();
        }
      },
      saveGame: (gameType, saveData) => {
        set({ 
          savedGames: { 
            ...get().savedGames, 
            [gameType]: saveData 
          } 
        });
        
        // 如果已登录，尝试同步
        if (get().isLoggedIn) {
          set({ syncStatus: 'pending' });
          get().syncWithCloud();
        }
      },
      updatePreferences: (prefs) => {
        set({ 
          preferences: { 
            ...get().preferences, 
            ...prefs 
          } 
        });
        
        // 如果已登录，尝试同步
        if (get().isLoggedIn) {
          set({ syncStatus: 'pending' });
          get().syncWithCloud();
        }
      },
      
      // 云同步操作
      syncWithCloud: async () => {
        if (!get().isLoggedIn || !get().token) {
          set({ syncStatus: 'offline' });
          return;
        }
        
        try {
          // 获取服务器上的数据
          const response = await apiService.gameData.getAll();
          
          // 合并服务器数据和本地数据
          const serverData = response.data;
          
          // 对每种游戏类型进行数据同步
          const gameTypes = new Set([
            ...Object.keys(get().gameProgress),
            ...Object.keys(get().savedGames),
            ...serverData.map((data: any) => data.gameType)
          ]);
          
          // 对每种游戏类型进行同步
          for (const gameType of gameTypes) {
            const serverGameData = serverData.find((data: any) => data.gameType === gameType);
            
            // 如果服务器有数据但本地没有，或者服务器数据更新，使用服务器数据
            if (serverGameData && serverGameData.lastUpdated) {
              const serverLastUpdated = new Date(serverGameData.lastUpdated);
              const localLastUpdated = get().lastSynced;
              
              if (!localLastUpdated || serverLastUpdated > localLastUpdated) {
                // 更新本地数据
                if (serverGameData.data.progress) {
                  set({
                    gameProgress: {
                      ...get().gameProgress,
                      [gameType]: serverGameData.data.progress
                    }
                  });
                }
                
                if (serverGameData.data.savedGames) {
                  set({
                    savedGames: {
                      ...get().savedGames,
                      [gameType]: serverGameData.data.savedGames
                    }
                  });
                }
              }
            }
            
            // 如果本地有数据，上传到服务器
            if (get().gameProgress[gameType] || get().savedGames[gameType]) {
              await apiService.gameData.update(gameType, {
                progress: get().gameProgress[gameType] || {},
                savedGames: get().savedGames[gameType] || {}
              });
            }
          }
          
          // 同步用户偏好设置
          await apiService.gameData.update('preferences', get().preferences);
          
          // 更新同步状态
          set({ 
            syncStatus: 'synced',
            lastSynced: new Date()
          });
        } catch (error) {
          console.error('同步失败:', error);
          set({ syncStatus: 'failed' });
        }
      },
      setSyncStatus: (status) => set({ syncStatus: status }),
    }),
    {
      name: 'unusual-chessboard-storage',
      partialize: (state) => ({
        // 只持久化这些字段
        gameProgress: state.gameProgress,
        savedGames: state.savedGames,
        preferences: state.preferences,
        user: state.user,
        token: state.token,
        isLoggedIn: state.isLoggedIn,
        lastSynced: state.lastSynced
      }),
    }
  )
); 