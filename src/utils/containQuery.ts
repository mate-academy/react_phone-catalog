import { Product } from '../types/Product';

export const containQuery = (product: Product, query: string): boolean => {
  return product.name.toLowerCase()
    .includes(query.toLowerCase());
};
