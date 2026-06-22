'use client';

import { useTranslation } from '@/shared/hooks';
import { BodyText } from '@/shared/ui/Typography';

export const ContentLanguageNotice = () => {
  const { t, language } = useTranslation();

  if (language === 'en') {
    return null;
  }

  return (
    <div className="mb-6 flex gap-3 border border-brand-elements bg-brand-surface-1 px-4 py-3">
      <div className="flex size-5 shrink-0 items-center justify-center rounded-full border border-brand-secondary text-xs font-semibold text-brand-secondary">
        i
      </div>

      <BodyText className="text-brand-secondary">
        {t('contentLanguageNotice')}
      </BodyText>
    </div>
  );
};
