'use client';

import { TranslationKey, translations } from '@/shared/constants/translations';
import { useSettingsStore } from '@/shared/store';

export const useTranslation = () => {
  const language = useSettingsStore((state) => state.language);

  const t = (key: TranslationKey) => {
    return translations[language][key] ?? key;
  };

  return { t, language };
};
