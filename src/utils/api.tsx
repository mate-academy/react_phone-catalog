import { Product } from '../types/product';

export const getHotPriceProducts = (products: Product[]) => {
  return [...products]
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, 12);
};

export const getBrandNewProducts = (products: Product[]) => {
  return [...products].sort((a, b) => b.year - a.year).slice(0, 12);
};

export const sortByAge = (products: Product[]) => {
  return [...products].sort((a, b) => b.year - a.year);
};

export const sortByCheapest = (products: Product[]) => {
  return [...products].sort((a, b) => a.price - b.price);
};

export const sortByAlphabet = (products: Product[]) => {
  return products.sort();
};
