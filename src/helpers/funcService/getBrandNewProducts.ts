import { Product } from '../types/Product';

export const getBrandNewProducts = (products: Product[]) => {
  const maxYear = Math.max(...products.map((product) => product.year));

  return products
    .filter((product) => product.year === maxYear)
    .sort((p1, p2) => p2.fullPrice - p1.fullPrice);
};
