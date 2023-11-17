import { Product } from '../types/Product';

export const getProductDiscount = ({ price, discount }: Product) => {
  return price - discount * (price / 100);
};
