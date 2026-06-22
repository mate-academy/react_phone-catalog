import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import {
  Currency,
  DEFAULT_CURRENCY,
  DEFAULT_LANGUAGE,
  FALLBACK_CURRENCY_RATES,
  Language,
} from '@/shared/constants/settings';

type SettingsStore = {
  language: Language;
  currency: Currency;
  currencyRates: Record<Currency, number>;
  setLanguage: (language: Language) => void;
  setCurrency: (currency: Currency) => void;
  setCurrencyRates: (currencyRates: Record<Currency, number>) => void;
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      language: DEFAULT_LANGUAGE,
      currency: DEFAULT_CURRENCY,
      currencyRates: FALLBACK_CURRENCY_RATES,

      setLanguage: (language) => set({ language }),
      setCurrency: (currency) => set({ currency }),
      setCurrencyRates: (currencyRates) => set({ currencyRates }),
    }),
    {
      name: 'nice-gadgets-settings',
    },
  ),
);
