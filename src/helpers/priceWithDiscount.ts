import { Product } from '../types/Product';

export const priceWithDiscount = (product: Product) => {
  if (!product.discount) {
    return product.price;
  }

  return product.price - (product.discount * product.price) / 100;
};
