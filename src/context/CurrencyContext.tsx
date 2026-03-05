import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { Currency } from '@/types/Currency';

type CurrencyContextType = {
  currency: Currency;
  toggleCurrency: () => void;
  rate: number;
};

const CurrencyContext = createContext<CurrencyContextType | null>(null);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currency, setCurrency] = useLocalStorage<Currency>('currency', 'USD');

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === 'USD' ? 'UAH' : 'USD'));
  };

  const rate = 43.23;

  const value = {
    currency,
    toggleCurrency,
    rate,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
};
