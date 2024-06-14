import { Product } from '../types';

export const filterProducts = (products: Product[], query: string) =>
  products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()),
  );
