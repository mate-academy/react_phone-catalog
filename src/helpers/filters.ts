import { Product } from '../types/product';

export const sortProducts = (products: Product[], activeFilter: string) => {
  switch (activeFilter) {
    case 'age':
      return products.sort((a, b) => b.year - a.year);
    case 'name':
      return products.sort((a, b) => a.name.localeCompare(b.name));
    case 'price':
      return products.sort((a, b) => a.price - b.price);
    default:
      return products;
  }
};

export const filterProducts = (products: Product[], query: string) => {
  return products.filter(({ name }) =>
    name.toLowerCase().includes(query.toLowerCase()));
};

export const getHotPriceProducts = (productsToSort: Product[]) =>
  productsToSort
    .sort((a, b) => {
      const aDiff = a.fullPrice - a.price;
      const bDiff = b.fullPrice - b.price;

      return bDiff - aDiff;
    })
    .slice(0, 16);

export const getBrandNewProducts = (productsToSort: Product[]) =>
  productsToSort.sort((a, b) => b.year - a.year).slice(0, 16);

export const getRandomProducts = (products: Product[]) => {
  return Array.from(
    { length: 16 },
    () => products[Math.floor(Math.random() * products.length)],
  );
};
