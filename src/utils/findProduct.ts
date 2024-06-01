import { Product } from '../types/types';

export const findProduct = (products: Product[], query: string): Product[] => {
  return products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()),
  );
};
