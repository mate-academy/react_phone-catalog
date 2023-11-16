import { Product } from '../types/Product';

export const getDiscountAmount = (product: Product) => {
  const { price, discount } = product;

  return price * (discount / 100);
};

export const getDiscountedPrice = (product: Product) => {
  const { price } = product;

  return price - getDiscountAmount(product);
};
