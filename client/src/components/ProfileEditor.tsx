import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGameStore } from '../store/useGameStore';
import apiService from '../services/api';

/**
 * 个人资料编辑组件
 * 支持昵称、签名编辑和头像显示（占位图）
 * simpleMode: 仅显示头像、昵称、签名，不显示保存按钮
 */
interface ProfileEditorProps {
  simpleMode?: boolean; // 是否为简洁模式，仅显示头像、昵称、签名
}

// ProfileEditor 组件，负责用户资料的编辑与展示
const ProfileEditor: React.FC<ProfileEditorProps> = ({ simpleMode }) => {
  const { t } = useTranslation();
  // 获取用户信息和更新方法
  const user = useGameStore((state) => state.user);
  const updateUser = useGameStore((state) => state.updateUser);
  // 本地状态：昵称和签名
  const [nickname, setNickname] = useState(user?.name || '');
  const [signature, setSignature] = useState(user?.signature || '');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // 保存按钮点击事件，更新全局用户信息并同步到后端
  const handleSave = async () => {
    setLoading(true);
    setSuccess(false);
    try {
      // 调用后端API同步
      await apiService.users.updateProfile({ name: nickname, signature });
      // 更新本地store
      updateUser({ name: nickname, signature });
      setSuccess(true);
    } catch (e) {
      // 可根据需要处理错误
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* 头像区域 */}
      <div className="avatar mb-4">
        <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src={user?.avatar || '/default-avatar.png'} alt="avatar" />
        </div>
      </div>
      {/* 昵称输入框 */}
      <div className="form-control w-full max-w-xs mb-2">
        <input
          type="text"
          className="input input-bordered text-center"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder={t('profile_editor.nickname')}
          disabled={simpleMode}
        />
      </div>
      {/* 签名输入框 */}
      <div className="form-control w-full max-w-xs mb-2">
        <input
          type="text"
          className="input input-bordered text-center"
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
          placeholder={t('profile_editor.signature')}
          disabled={simpleMode}
        />
      </div>
      {/* 保存按钮，仅在非简洁模式下显示 */}
      {!simpleMode && (
        <button className="btn btn-primary mt-2" onClick={handleSave} disabled={loading}>
          {loading ? t('actions.save') + '...' : t('actions.save')}
        </button>
      )}
      {success && <div className="text-success mt-2">{t('actions.save')}成功！</div>}
    </div>
  );
};

export default ProfileEditor; 