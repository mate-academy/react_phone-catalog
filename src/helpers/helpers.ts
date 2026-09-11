import { type Product } from '../types';

export const getYear = (product: Product) => {
  const match = product.name.match(/\((\d{4})\)/);

  return match ? Number(match[1]) : 0;
};
