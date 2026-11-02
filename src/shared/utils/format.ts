export const formatPrice = (price: number | undefined): string | null => {
  if (price === undefined) {
    return null;
  }

  return `$${price}`;
};

export const formatMemory = (value: string | undefined): string => {
  if (!value) {
    return '';
  }

  return value.replace(/(\d+)(GB|TB)/i, '$1 $2');
};
