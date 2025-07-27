import type { Product } from '../../types/products';

export const helperToFindHotPrice = (products: Product[]): Product[] => {
  const hotPriceProducts = products
    .filter((product) => product.price !== product.fullPrice)
    .sort((a, b) => {
      const discountA = a.fullPrice - a.price;
      const discountB = b.fullPrice - b.price;
      return discountB - discountA;
    });

  return hotPriceProducts;
};
