import { Product, SortType } from '../types';

export const getDiscount = (product: Product) =>
  product.fullPrice - product.price;

const sorters: Record<SortType, (first: Product, second: Product) => number> = {
  age: (first, second) => second.year - first.year,
  title: (first, second) => first.name.localeCompare(second.name),
  price: (first, second) => first.price - second.price,
};

export const sortProducts = (products: Product[], sortType: SortType) =>
  [...products].sort(sorters[sortType]);

export const filterByQuery = (products: Product[], query: string) => {
  const normalizedQuery = query.trim().toLowerCase();

  return products.filter(product =>
    product.name.toLowerCase().includes(normalizedQuery),
  );
};

export const getHotPriceProducts = (products: Product[]) =>
  [...products].sort(
    (first, second) => getDiscount(second) - getDiscount(first),
  );

export const getNewestProducts = (products: Product[]) =>
  [...products].sort(
    (first, second) => second.year - first.year || second.price - first.price,
  );
