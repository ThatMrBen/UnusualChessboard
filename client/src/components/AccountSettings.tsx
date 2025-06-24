import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGameStore } from '../store/useGameStore';

/**
 * 账号设置组件
 * 提供修改邮箱、密码和退出登录的功能
 */
const AccountSettings: React.FC = () => {
  const { t } = useTranslation();
  const logout = useGameStore((state) => state.logout);
  const userEmail = 'user-example@email.com'; // 这是一个示例邮箱

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">{t('settings.account')}</h2>

      <div className="space-y-4">
        {/* 绑定邮箱 */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">{t('account_settings.email')}</span>
          </label>
          <div className="input-group">
            <input
              type="text"
              readOnly
              value={userEmail.replace(/(.{3}).*@/, '***@')}
              className="input input-bordered w-full"
            />
            <button className="btn btn-outline">{t('account_settings.change_email')}</button>
          </div>
        </div>

        {/* 修改密码 */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">{t('account_settings.password')}</span>
          </label>
          <button className="btn btn-outline">{t('account_settings.change_password')}</button>
        </div>
      </div>

      <div className="divider mt-8 mb-6"></div>

      {/* 退出登录 */}
      <div className="text-center">
        <button className="btn btn-error" onClick={logout}>
          {t('logout')}
        </button>
      </div>
    </div>
  );
};

export default AccountSettings; 