import type { DetailedProduct } from '../types/detailedProduct';

export const generateDisplayId = (product: DetailedProduct): string => {
  const relevantParams: (string | number)[] = [
    product.category,
    product.name,
    product.capacity,
    product.color,
  ];

  const displayId = relevantParams
    .map((param) => {
      const str = String(param || '')
        .trim()
        .toUpperCase();
      if (str.length >= 2) {
        return str.slice(0, 2);
      } else if (str.length === 1) {
        return str + '0';
      } else {
        return '00000000';
      }
    })
    .join('');

  return displayId;
};
