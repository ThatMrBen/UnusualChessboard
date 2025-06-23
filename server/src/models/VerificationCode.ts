import mongoose, { Document, Schema } from 'mongoose';

export interface IVerificationCode extends Document {
  email: string;
  code: string;
  type: 'registration' | 'password-reset' | 'two-factor' | 'email-verification';
  expiresAt: Date;
  createdAt: Date;
}

const verificationCodeSchema = new Schema<IVerificationCode>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['registration', 'password-reset', 'two-factor', 'email-verification'],
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      default: function() {
        // 默认15分钟过期
        return new Date(Date.now() + 15 * 60 * 1000);
      }
    }
  },
  {
    timestamps: true,
  }
);

// 自动删除过期的验证码
verificationCodeSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model<IVerificationCode>('VerificationCode', verificationCodeSchema); 