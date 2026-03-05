import { cn } from '@/lib/utils';
import { TYPOGRAPHY } from '@/constants/typography';
import { User } from 'lucide-react';
import { Card } from './Card';
import { FormField } from './FormField';
import type { UserProfile } from '../types/userProfile';
import { useTranslation } from 'react-i18next';

interface PersonalDataSectionProps {
  profile: UserProfile;
  isLoadingProfile: boolean;
  isSaving: boolean;
  email: string;
  displayName: string;
  onNameChange: (name: string) => void;
  onPhoneChange: (phone: string) => void;
  onSave: () => void;
}

export const PersonalDataSection = ({
  profile,
  isLoadingProfile,
  isSaving,
  email,
  displayName,
  onNameChange,
  onPhoneChange,
  onSave,
}: PersonalDataSectionProps) => {
  const { t } = useTranslation();
  return (
    <Card>
      <h2 className={cn(TYPOGRAPHY.h4, 'text-foreground mb-6')}>
        {t('login.personalData')}
      </h2>

      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-8">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center border-2 border-border flex-shrink-0">
          <User className="w-8 h-8 text-muted-foreground" />
        </div>
        <div>
          <p className={cn(TYPOGRAPHY.h4, 'text-foreground')}>
            {isLoadingProfile ?
              <span className="inline-block h-5 w-32 bg-muted rounded animate-pulse" />
            : profile.name || displayName || t('ui.user')}
          </p>
          <p className="text-sm text-muted-foreground mt-1">{email}</p>
        </div>
      </div>

      {isLoadingProfile ?
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="h-14 bg-muted rounded-xl animate-pulse"
            />
          ))}
        </div>
      : <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label={t('login.fullName')}
            placeholder={t('login.enterFullName')}
            value={profile.name}
            onChange={onNameChange}
          />
          <FormField
            label="Email"
            type="email"
            placeholder="your@email.com"
            value={email}
            disabled
          />
          <FormField
            label={t('login.phone')}
            type="tel"
            placeholder="+38 (0xx) xxx-xx-xx"
            value={profile.phone}
            onChange={onPhoneChange}
          />
        </div>
      }

      <button
        onClick={onSave}
        disabled={isSaving || isLoadingProfile}
        className="mt-6 px-6 py-3 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSaving ? t('ui.preservation') : t('ui.saveChanges')}
      </button>
    </Card>
  );
};
