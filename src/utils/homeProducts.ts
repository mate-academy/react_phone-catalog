import { Product } from '../types/Product';

// products with a discount, the biggest absolute discount first
export const getHotPrices = (products: Product[]) =>
  products
    .filter(product => product.fullPrice > product.price)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));

// the newest products according to the year field
export const getBrandNew = (products: Product[]) => {
  const newestYear = Math.max(...products.map(product => product.year));

  return products
    .filter(product => product.year === newestYear)
    .sort((a, b) => a.price - b.price);
};
