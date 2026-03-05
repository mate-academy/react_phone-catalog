import { cn } from '@/lib/utils';
import { TYPOGRAPHY } from '@/constants/typography';
import { ChevronRight, LogOut, Lock, Trash2 } from 'lucide-react';
import { Card } from './Card';
import { useTranslation } from 'react-i18next';

interface SecuritySectionProps {
  isGoogleUser: boolean;
  onChangePassword: () => void;
  onLogout: () => void;
  onDeleteAccount: () => void;
}

export const SecuritySection = ({
  isGoogleUser,
  onChangePassword,
  onLogout,
  onDeleteAccount,
}: SecuritySectionProps) => {
  const { t } = useTranslation();
  return (
    <Card>
      <h2 className={cn(TYPOGRAPHY.h4, 'text-foreground mb-6')}>
        {t('login.securityAccount')}
      </h2>
      <div className="flex flex-col gap-3">
        {!isGoogleUser && (
          <button
            onClick={onChangePassword}
            className="flex items-center justify-between w-full p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <Lock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                {t('login.changePassword')}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        )}

        <button
          onClick={onLogout}
          className="flex items-center gap-3 w-full p-4 rounded-xl border border-border text-foreground hover:bg-muted/50 transition-colors text-sm font-medium"
        >
          <LogOut className="w-4 h-4" />
          {t('login.logOutAccount')}
        </button>

        <button
          onClick={onDeleteAccount}
          className="flex items-center gap-3 w-full p-4 rounded-xl border border-[#eb5757]/30 text-[#eb5757] hover:bg-[#eb5757]/5 transition-colors text-sm font-medium"
        >
          <Trash2 className="w-4 h-4" />
          {t('login.deleteAccount')}
        </button>
      </div>
    </Card>
  );
};
