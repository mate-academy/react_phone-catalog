export const formatCreditCardNumber = (value: string): string => {
  const cleanedValue = value.replace(/\D/g, '');
  const limitedValue = cleanedValue.slice(0, 16);

  const match = limitedValue.match(/.{1,4}/g);

  return match ? match.join(' ') : '';
};

export const formatExpirationDate = (value: string): string => {
  const cleanedValue = value.replace(/[^\d]/g, '');

  if (cleanedValue.length <= 2) {
    return cleanedValue;
  }

  if (cleanedValue.length > 2) {
    return `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2, 4)}`;
  }

  return value;
};
