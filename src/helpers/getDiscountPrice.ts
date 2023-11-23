import { Product } from '../Types/Product';

export const getDiscountPrice = (product:Product) => {
  return product.price - (product.price * product.discount) / 100;
};
