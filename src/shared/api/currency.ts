type ExchangeRateResponse = {
  result: string;
  rates: Record<string, number>;
};

export const getUsdToUahRate = async (): Promise<number> => {
  const response = await fetch('https://open.er-api.com/v6/latest/USD');

  if (!response.ok) {
    throw new Error('Failed to fetch exchange rate');
  }

  const data: ExchangeRateResponse = await response.json();

  const rate = data.rates?.UAH;

  if (data.result !== 'success' || !rate || rate <= 0) {
    throw new Error('Invalid exchange rate');
  }

  return rate;
};
