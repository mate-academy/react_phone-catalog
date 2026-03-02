export const formatPrice = (amount: number, language: string) => {
  const isUA = language === 'ua' || language === 'uk';
  const currency = isUA ? 'UAH' : 'USD';
  const rate = isUA ? 43 : 1;

  return new Intl.NumberFormat(isUA ? 'uk-UA' : 'en-US', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount * rate);
};
