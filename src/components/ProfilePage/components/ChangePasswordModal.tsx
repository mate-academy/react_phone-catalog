import { useState } from 'react';
import { auth } from '@/firebase/firebase';
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';
import { cn } from '@/lib/utils';
import { TYPOGRAPHY } from '@/constants/typography';
import { showSuccess, showError } from '@/lib/toast';
import { X } from 'lucide-react';
import { FormField } from './FormField';
import { PasswordToggleButton } from './PasswordToggleButton';
import { getFirebaseAuthErrorMessage } from '../helpers/getFirebaseAuthErrorMessage';
import { useTranslation } from 'react-i18next';

interface ChangePasswordModalProps {
  onClose: () => void;
}

export const ChangePasswordModal = ({ onClose }: ChangePasswordModalProps) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] =
    useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const handleToggleCurrentPasswordVisibility = () => {
    setIsCurrentPasswordVisible((previous) => !previous);
  };

  const handleToggleNewPasswordVisibility = () => {
    setIsNewPasswordVisible((previous) => !previous);
  };

  const handleSubmit = async () => {
    if (newPassword.length < 6) {
      showError('Новий пароль має містити мінімум 6 символів');
      return;
    }
    if (newPassword !== confirmPassword) {
      showError('Паролі не збігаються');
      return;
    }
    const user = auth.currentUser;
    if (!user || !user.email) return;

    setIsLoading(true);
    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword,
      );
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      showSuccess('Пароль успішно змінено');
      onClose();
    } catch (error: unknown) {
      showError(getFirebaseAuthErrorMessage(error, 'Помилка при зміні паролю'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-card rounded-2xl border border-border p-6 w-full max-w-md mx-4 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className={cn(TYPOGRAPHY.h4, 'text-foreground')}>
            {t('login.changePassword')}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <FormField
            label={t('login.currentPassword')}
            placeholder="••••••••"
            type={isCurrentPasswordVisible ? 'text' : 'password'}
            value={currentPassword}
            onChange={setCurrentPassword}
            rightElement={
              <PasswordToggleButton
                isVisible={isCurrentPasswordVisible}
                onToggle={handleToggleCurrentPasswordVisibility}
              />
            }
          />
          <FormField
            label={t('login.newPassword')}
            placeholder={t('login.passwordLength')}
            type={isNewPasswordVisible ? 'text' : 'password'}
            value={newPassword}
            onChange={setNewPassword}
            rightElement={
              <PasswordToggleButton
                isVisible={isNewPasswordVisible}
                onToggle={handleToggleNewPasswordVisibility}
              />
            }
          />
          <FormField
            label={t('login.passwordConfirm')}
            placeholder="••••••••"
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
          />
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            {t('ui.cancel')}
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex-1 px-4 py-3 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-80 transition-opacity disabled:opacity-50"
          >
            {isLoading ? t('ui.preservation"') : t('login.changePassword')}
          </button>
        </div>
      </div>
    </div>
  );
};
