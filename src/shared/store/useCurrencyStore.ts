import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Currency = 'USD' | 'UAH';

type CurrencyState = {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
};

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      currency: 'UAH',
      setCurrency: (currency) => set({ currency }),
    }),
    {
      name: 'nice-gadgets-currency',
    },
  ),
);
