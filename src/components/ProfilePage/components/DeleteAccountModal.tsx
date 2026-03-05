import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/firebase/firebase';
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
} from 'firebase/auth';
import { cn } from '@/lib/utils';
import { TYPOGRAPHY } from '@/constants/typography';
import { showError } from '@/lib/toast';
import { X } from 'lucide-react';
import { FormField } from './FormField';
import { getFirebaseAuthErrorMessage } from '../helpers/getFirebaseAuthErrorMessage';
import { isGoogleAuthProvider } from '../helpers/isGoogleAuthProvider';
import { useTranslation } from 'react-i18next';

interface DeleteAccountModalProps {
  onClose: () => void;
}

export const DeleteAccountModal = ({ onClose }: DeleteAccountModalProps) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { t } = useTranslation();

  const isGoogleUser = isGoogleAuthProvider(currentUser);

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;
    if (!user) return;

    setIsLoading(true);
    try {
      if (!isGoogleUser) {
        if (!user.email) return;
        const credential = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(user, credential);
      }
      await deleteUser(user);
      navigate('/login', { replace: true });
    } catch (error: unknown) {
      showError(
        getFirebaseAuthErrorMessage(error, 'Помилка при видаленні акаунту'),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isDeleteDisabled = isLoading || (!isGoogleUser && !password);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-card rounded-2xl border border-border p-6 w-full max-w-md mx-4 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className={cn(TYPOGRAPHY.h4, 'text-[#eb5757]')}>
            {t('login.deleteAccount')}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          {t('login.deleteAccountNotification')}
        </p>

        {!isGoogleUser && (
          <div className="mb-6">
            <FormField
              label={t('login.enterPasswordForConfirmation')}
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={setPassword}
            />
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            {t('ui.cancel')}
          </button>
          <button
            onClick={handleDeleteAccount}
            disabled={isDeleteDisabled}
            className="flex-1 px-4 py-3 rounded-xl bg-[#eb5757] text-white text-sm font-medium hover:opacity-80 transition-opacity disabled:opacity-50"
          >
            {isLoading ? t('ui.deleting') : t('ui.delete')}
          </button>
        </div>
      </div>
    </div>
  );
};
