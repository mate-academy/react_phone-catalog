import { Product } from '../../types/Product';

export const getHotPriceProducts = (products: Product[]): Product[] => {
  return products.filter((product) => product.fullPrice - product.price >= 80);
};
