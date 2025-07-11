import axios, { AxiosInstance, AxiosResponse } from 'axios';
import type {
  ApiResponse,
  User,
  UserProfile,
  LoginRequest,
  RegisterRequest,
  PasswordResetRequest,
  TwoFactorRequest,
  Game,
  GameData,
  GrowthScoreRequest,
  ApiService,
} from '../types/api';

// 创建axios实例
// 用于与后端API进行通信的HTTP客户端
export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器：添加认证token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器：统一错误处理
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // 清除无效token
      localStorage.removeItem('token');
      // 可以在这里添加重定向到登录页的逻辑
    }
    return Promise.reject(error);
  }
);

// 游戏相关API
const games = {
  // 获取所有游戏
  getAll: async (): Promise<Game[]> => {
    const response = await api.get<Game[]>('/games');
    return response.data;
  },
  
  // 根据ID获取游戏
  getById: async (id: string): Promise<Game> => {
    const response = await api.get<Game>(`/games/${id}`);
    return response.data;
  },
  
  // 根据分类获取游戏
  getByCategory: async (category: string): Promise<Game[]> => {
    const response = await api.get<Game[]>(`/games/category/${category}`);
    return response.data;
  },
};

// 用户相关API
const users = {
  // 用户登录
  login: async (data: LoginRequest): Promise<ApiResponse<{ user: User; token: string }>> => {
    const response = await api.post<ApiResponse<{ user: User; token: string }>>('/auth/login', data);
    return response.data;
  },
  
  // 用户注册
  register: async (data: RegisterRequest): Promise<ApiResponse<{ user: User; token: string }>> => {
    const response = await api.post<ApiResponse<{ user: User; token: string }>>('/auth/register', data);
    return response.data;
  },
  
  // 发送注册验证码
  sendRegistrationCode: async (email: string): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/auth/register/send-code', { email });
    return response.data;
  },
  
  // 退出登录
  logout: async (): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/auth/logout');
    return response.data;
  },
  
  // 获取用户资料
  getProfile: async (): Promise<ApiResponse<User>> => {
    const response = await api.get<ApiResponse<User>>('/users/profile');
    return response.data;
  },
  
  // 更新用户资料
  updateProfile: async (data: UserProfile): Promise<ApiResponse<User>> => {
    const response = await api.put<ApiResponse<User>>('/users/profile', data);
    return response.data;
  },
  
  // 发送重置密码验证码
  sendPasswordResetCode: async (email: string): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/auth/password-reset/send-code', { email });
    return response.data;
  },
  
  // 重置密码
  resetPassword: async (data: PasswordResetRequest): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/auth/password-reset', data);
    return response.data;
  },
  
  // 二步验证
  verifyTwoFactor: async (data: TwoFactorRequest): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/auth/verify-two-factor', data);
    return response.data;
  },
};

// 游戏数据相关API
const gameData = {
  // 获取所有游戏数据
  getAll: async (): Promise<GameData[]> => {
    const response = await api.get<GameData[]>('/game-data');
    return response.data;
  },
  
  // 根据类型获取游戏数据
  getByType: async (gameType: string): Promise<GameData[]> => {
    const response = await api.get<GameData[]>(`/game-data/${gameType}`);
    return response.data;
  },
  
  // 更新游戏数据
  update: async (gameType: string, data: Record<string, unknown>): Promise<ApiResponse<GameData>> => {
    const response = await api.put<ApiResponse<GameData>>(`/game-data/${gameType}`, { data });
    return response.data;
  },
  
  // 更新成长分数
  updateGrowthScore: async (data: GrowthScoreRequest): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/game-data/growth-score', data);
    return response.data;
  },
  
  // 删除游戏数据
  delete: async (gameType: string): Promise<ApiResponse> => {
    const response = await api.delete<ApiResponse>(`/game-data/${gameType}`);
    return response.data;
  },
};

// 导出所有API对象
const apiService: ApiService = {
  games,
  users,
  gameData,
};

export default apiService;