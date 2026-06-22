'use client';

import {
  CURRENCIES,
  Currency,
  Language,
  LANGUAGES,
} from '@/shared/constants/settings';
import { useTranslation } from '@/shared/hooks';
import { cn } from '@/shared/lib/utils';
import { useSettingsStore } from '@/shared/store';
import { AppSelect } from '@/shared/ui/AppSelect';

type SettingsControlsProps = {
  className?: string;
};

export const SettingsControls = ({ className }: SettingsControlsProps) => {
  const { t } = useTranslation();
  const language = useSettingsStore((state) => state.language);
  const currency = useSettingsStore((state) => state.currency);
  const setLanguage = useSettingsStore((state) => state.setLanguage);
  const setCurrency = useSettingsStore((state) => state.setCurrency);

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="flex items-center gap-3 border-b border-brand-elements px-4 py-3">
        <span className="w-14 shrink-0 text-xs font-semibold uppercase tracking-wide text-brand-secondary">
          {t('language') ?? 'Lang'}
        </span>
        <AppSelect
          ariaLabel="Select language"
          value={language}
          options={LANGUAGES}
          onChange={(value) => {
            if (value) setLanguage(value as Language);
          }}
          className="flex-1"
          triggerClassName="h-8 w-24 rounded-none border border-brand-elements bg-brand-black text-xs font-semibold uppercase text-brand-white hover:border-brand-secondary"
        />
      </div>

      <div className="flex items-center gap-3 px-4 py-3">
        <span className="w-14 shrink-0 text-xs font-semibold uppercase tracking-wide text-brand-secondary">
          {t('currency') ?? 'Cur'}
        </span>
        <AppSelect
          ariaLabel="Select currency"
          value={currency}
          options={CURRENCIES}
          onChange={(value) => {
            if (value) setCurrency(value as Currency);
          }}
          className="flex-1"
          triggerClassName="h-8 w-24 rounded-none border border-brand-elements bg-brand-black text-xs font-semibold uppercase text-brand-white hover:border-brand-secondary"
        />
      </div>
    </div>
  );
};
