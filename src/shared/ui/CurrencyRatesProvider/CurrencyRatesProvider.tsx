'use client';

import { useEffect } from 'react';

import { getCurrencyRates } from '@/shared/api/getCurrencyRates';
import { useSettingsStore } from '@/shared/store';

type CurrencyRatesProviderProps = {
  children: React.ReactNode;
};

export const CurrencyRatesProvider = ({
  children,
}: CurrencyRatesProviderProps) => {
  const setCurrencyRates = useSettingsStore((state) => state.setCurrencyRates);

  useEffect(() => {
    getCurrencyRates().then(setCurrencyRates);
  }, [setCurrencyRates]);

  return <>{children}</>;
};
