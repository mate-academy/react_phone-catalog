import { Product } from '../types/Product';

export const applyDiscount = (product: Product) => {
  return Math.round(product.price * (1 - 0.01 * product.discount));
};
