import { Product } from '../types/Product';

export const filterProducts = (products: Product[], type: string) => {
  return products.filter(product => {
    return product.category === type;
  });
};
