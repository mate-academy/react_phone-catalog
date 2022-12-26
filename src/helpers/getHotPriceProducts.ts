import { Product } from '../types/Product';

export const getHotPriceProducts = (products: Product[]) => {
  return products
    .filter(product => product.discount > 0)
    .sort((p1, p2) => {
      const p1DiscountSum = (p1.price * p1.discount) / 100;
      const p2DiscountSum = (p2.price * p2.discount) / 100;

      return p1DiscountSum - p2DiscountSum;
    });
};
