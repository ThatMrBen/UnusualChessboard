import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

// 用户模型定义
// 包含用户基本信息、游戏数据和安全设置

export interface IUser extends Document {
  name: string;
  email: string;
  additionalEmails: string[];
  password: string;
  avatar?: string;
  role: 'user' | 'admin';
  gameData: {
    growthScore: number;
    preferences: Record<string, any>;
    gameProgress: Record<string, any>;
    savedGames: Record<string, any>;
  };
  security: {
    twoFactorEnabled: boolean;
    apiAccessEnabled: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((gmail\.com|outlook\.com|hotmail\.com|qq\.com|163\.com|126\.com|yahoo\.com|icloud\.com|mail\.ru|aol\.com|gmx\.com|mail\.com))$/,
        'Please provide a valid email from a supported domain',
      ],
    },
    additionalEmails: [{
      type: String,
      lowercase: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((gmail\.com|outlook\.com|hotmail\.com|qq\.com|163\.com|126\.com|yahoo\.com|icloud\.com|mail\.ru|aol\.com|gmx\.com|mail\.com))$/,
        'Please provide a valid email from a supported domain',
      ],
    }],
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    avatar: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    gameData: {
      growthScore: {
        type: Number,
        default: 0
      },
      preferences: {
        type: Schema.Types.Mixed,
        default: {}
      },
      gameProgress: {
        type: Schema.Types.Mixed,
        default: {}
      },
      savedGames: {
        type: Schema.Types.Mixed,
        default: {}
      }
    },
    security: {
      twoFactorEnabled: {
        type: Boolean,
        default: false
      },
      apiAccessEnabled: {
        type: Boolean,
        default: false
      }
    }
  },
  {
    timestamps: true,
  }
);

// 在保存前加密密码
// 使用bcrypt进行密码哈希，增加安全性
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// 比较密码
// 验证用户输入的密码是否与存储的哈希匹配
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    return false;
  }
};

export default mongoose.model<IUser>('User', userSchema); 