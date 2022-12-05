import { Product } from '../types/Product';

export const filterProductByType = (
  products: Product[],
  type: 'phone' | 'tablet' | 'accessory',
) => {
  return products.filter(product => product.type === type);
};
