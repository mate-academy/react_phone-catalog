import { Product } from '../types/Product';

export const deductDiscount = (item: Product) => {
  return ((100 - item.discount) / 100) * item.price;
};
