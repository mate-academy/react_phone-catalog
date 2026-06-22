import { Currency, FALLBACK_CURRENCY_RATES } from '@/shared/constants/settings';

type FrankfurterResponse = {
  rates: {
    EUR?: number;
    UAH?: number;
  };
};

export const getCurrencyRates = async (): Promise<Record<Currency, number>> => {
  try {
    const response = await fetch(
      'https://api.frankfurter.dev/v1/latest?base=USD&symbols=EUR,UAH',
    );

    if (!response.ok) {
      return FALLBACK_CURRENCY_RATES;
    }

    const data = (await response.json()) as FrankfurterResponse;

    return {
      usd: 1,
      eur: data.rates.EUR ?? FALLBACK_CURRENCY_RATES.eur,
      uah: data.rates.UAH ?? FALLBACK_CURRENCY_RATES.uah,
    };
  } catch {
    return FALLBACK_CURRENCY_RATES;
  }
};

export default getCurrencyRates;
