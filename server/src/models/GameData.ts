import mongoose, { Document, Schema } from 'mongoose';

// 游戏数据模型定义
// 用于存储用户的游戏进度、历史记录等数据

export interface IGameData extends Document {
  userId: mongoose.Types.ObjectId;
  gameType: string;
  data: Record<string, any>;
  lastUpdated: Date;
  createdAt: Date;
}

const gameDataSchema = new Schema<IGameData>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    gameType: {
      type: String,
      required: true,
    },
    data: {
      type: Schema.Types.Mixed,
      required: true,
      default: {},
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// 创建复合索引，确保每个用户每种游戏类型只有一条记录
// 这样可以防止数据重复，并优化查询性能
gameDataSchema.index({ userId: 1, gameType: 1 }, { unique: true });

export default mongoose.model<IGameData>('GameData', gameDataSchema); 