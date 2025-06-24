import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, GameProgress, GameSave, GameData } from '../types/api';
import apiService from '../services/api';

// 游戏状态管理
// 使用Zustand管理游戏状态，并支持持久化和云同步

// 游戏模式类型
export type GameMode = 'player-vs-ai' | 'player-vs-player' | 'ai-vs-ai' | 'three-player';

// 难度级别类型
export type Difficulty = 'easy' | 'medium' | 'hard';

// 同步状态类型
export type SyncStatus = 'synced' | 'pending' | 'failed' | 'offline';

// 用户偏好设置类型
export interface UserPreferences {
  theme: string;
  language: string;
  soundEnabled: boolean;
  musicEnabled: boolean;
  autoSave: boolean;
  notifications: boolean;
}

// 游戏状态接口
interface GameState {
  // 游戏设置
  currentGame: string | null;
  gameMode: GameMode | null;
  difficulty: Difficulty | null;
  
  // 用户数据
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  
  // 游戏进度
  gameProgress: Record<string, GameProgress>;
  savedGames: Record<string, GameSave>;
  preferences: UserPreferences;
  
  // 云同步状态
  syncStatus: SyncStatus;
  lastSynced: Date | null;
  
  // 游戏设置操作
  setCurrentGame: (game: string | null) => void;
  setGameMode: (mode: GameMode | null) => void;
  setDifficulty: (level: Difficulty | null) => void;
  resetGame: () => void;
  
  // 用户操作
  login: (userData: User, token: string) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  updateGrowthScore: (score: number) => void;
  
  // 游戏进度操作
  saveGameProgress: (gameType: string, progress: GameProgress) => void;
  saveGame: (gameType: string, saveData: GameSave) => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  
  // 云同步操作
  syncWithCloud: () => Promise<void>;
  setSyncStatus: (status: SyncStatus) => void;
}

// 默认用户偏好设置
const defaultPreferences: UserPreferences = {
  theme: 'light',
  language: 'zh',
  soundEnabled: true,
  musicEnabled: true,
  autoSave: true,
  notifications: true,
};

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
      preferences: defaultPreferences,
      
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
        // 清除本地存储的token
        localStorage.removeItem('token');
      },
      updateUser: (userData) => {
        const currentUser = get().user;
        if (!currentUser) return;
        set({ user: { ...currentUser, ...userData } });
      },
      updateGrowthScore: (score) => {
        const currentUser = get().user;
        if (!currentUser) return;
        
        // 更新本地分数
        set({ 
          user: { 
            ...currentUser, 
            growthScore: (currentUser.growthScore || 0) + score 
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
          const serverData = await apiService.gameData.getAll();
          
          // 合并服务器数据和本地数据
          const gameTypes = new Set([
            ...Object.keys(get().gameProgress),
            ...Object.keys(get().savedGames),
            ...serverData.map((data: GameData) => data.gameType)
          ]);
          
          // 同步每种游戏类型的数据
          for (const gameType of gameTypes) {
            const localProgress = get().gameProgress[gameType];
            const serverGameData = serverData.find((data: GameData) => data.gameType === gameType);
            
            if (serverGameData) {
              // 合并服务器数据到本地
              if (localProgress && serverGameData.score > localProgress.totalScore) {
                set({
                  gameProgress: {
                    ...get().gameProgress,
                    [gameType]: {
                      ...localProgress,
                      totalScore: serverGameData.score,
                      gamesPlayed: (localProgress.gamesPlayed || 0) + 1,
                      lastPlayed: serverGameData.updatedAt,
                    }
                  }
                });
              }
            }
          }
          
          set({ 
            syncStatus: 'synced',
            lastSynced: new Date()
          });
        } catch (error) {
          console.error('Failed to sync with cloud:', error);
          set({ syncStatus: 'failed' });
        }
      },
      setSyncStatus: (status) => set({ syncStatus: status }),
    }),
    {
      name: 'game-store',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        gameProgress: state.gameProgress,
        savedGames: state.savedGames,
        preferences: state.preferences,
      }),
    }
  )
); 