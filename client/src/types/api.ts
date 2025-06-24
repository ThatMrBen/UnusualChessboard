// API 响应基础类型
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// 用户相关类型
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  signature?: string;
  role: string;
  growthScore: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  name?: string;
  avatar?: string;
  signature?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  code: string;
}

export interface PasswordResetRequest {
  email: string;
  code: string;
  newPassword: string;
}

export interface TwoFactorRequest {
  email: string;
  code: string;
}

// 游戏相关类型
export interface Game {
  id: string;
  name: string;
  nameKey: string;
  description: string;
  descriptionKey: string;
  category: 'chess' | 'board' | 'casual';
  image?: string;
  rules?: string;
  minPlayers: number;
  maxPlayers: number;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number; // 分钟
  isAvailable: boolean;
}

export interface GameCategory {
  chess: Game[];
  board: Game[];
  casual: Game[];
}

// 游戏数据相关类型
export interface GameData {
  id: string;
  userId: string;
  gameType: string;
  gameMode: 'player-vs-ai' | 'player-vs-player' | 'ai-vs-ai' | 'three-player';
  difficulty: 'easy' | 'medium' | 'hard';
  score: number;
  moves: GameMove[];
  gameState: Record<string, unknown>;
  duration: number; // 秒
  result: 'win' | 'lose' | 'draw' | 'in-progress';
  createdAt: string;
  updatedAt: string;
}

export interface GameMove {
  id: string;
  player: string;
  move: string;
  timestamp: number;
  position: Record<string, unknown>;
}

export interface GameProgress {
  gameType: string;
  currentLevel: number;
  totalScore: number;
  gamesPlayed: number;
  gamesWon: number;
  bestScore: number;
  averageTime: number;
  lastPlayed: string;
}

export interface GameSave {
  id: string;
  gameType: string;
  gameState: Record<string, unknown>;
  moves: GameMove[];
  createdAt: string;
  updatedAt: string;
}

export interface GrowthScoreRequest {
  score: number;
  gameType: string;
  gameMode: string;
}

// API 服务类型
export interface ApiService {
  games: {
    getAll: () => Promise<Game[]>;
    getById: (id: string) => Promise<Game>;
    getByCategory: (category: string) => Promise<Game[]>;
  };
  users: {
    login: (data: LoginRequest) => Promise<ApiResponse<{ user: User; token: string }>>;
    register: (data: RegisterRequest) => Promise<ApiResponse<{ user: User; token: string }>>;
    sendRegistrationCode: (email: string) => Promise<ApiResponse>;
    logout: () => Promise<ApiResponse>;
    getProfile: () => Promise<ApiResponse<User>>;
    updateProfile: (data: UserProfile) => Promise<ApiResponse<User>>;
    sendPasswordResetCode: (email: string) => Promise<ApiResponse>;
    resetPassword: (data: PasswordResetRequest) => Promise<ApiResponse>;
    verifyTwoFactor: (data: TwoFactorRequest) => Promise<ApiResponse>;
  };
  gameData: {
    getAll: () => Promise<GameData[]>;
    getByType: (gameType: string) => Promise<GameData[]>;
    update: (gameType: string, data: Record<string, unknown>) => Promise<ApiResponse<GameData>>;
    updateGrowthScore: (data: GrowthScoreRequest) => Promise<ApiResponse>;
    delete: (gameType: string) => Promise<ApiResponse>;
  };
} 