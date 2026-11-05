export const formatPrice = (
  priceInUsd: number,
  exchangeRate?: number,
  currency: 'USD' | 'UAH' = 'UAH',
): string => {
  const formatter = new Intl.NumberFormat('uk-UA', {
    maximumFractionDigits: 0,
  });

  if (currency === 'USD' || !exchangeRate || exchangeRate <= 0) {
    return `$${formatter.format(priceInUsd)}`;
  }

  const priceInUah = priceInUsd * exchangeRate;

  return `${formatter.format(priceInUah)} ₴`;
};
