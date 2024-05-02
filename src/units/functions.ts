import { Product } from '../types/products';

export const getProductsPhones = (allProducts: Product[]) => {
  const result = [...allProducts];

  return result.filter(product => product.category === 'phones');
};

export const sortNewestYear = (allProducts: Product[]) => {
  if (allProducts.length === 0) {
    return [];
  }

  const result = [...allProducts];

  const maxYear = result.reduce(
    (max, product) => (product.year > max ? product.year : max),
    result[0].year,
  );

  return result.filter(product => product.year === maxYear);
};

export const getBiggestSaleProduct = (allProducts: Product[]) => {
  const result = [...allProducts];

  const sortedBySale = result.sort(
    (p1, p2) => p2.fullPrice - p2.price - (p1.fullPrice - p1.price),
  );

  return sortedBySale.slice(0, 20);
};
