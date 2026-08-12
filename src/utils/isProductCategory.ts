import type { ProductCategory } from '../types/product';

export const isProductCategory = (value: string): value is ProductCategory => {
  return value === 'phones' || value === 'tablets' || value === 'accessories';
};
