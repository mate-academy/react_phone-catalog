import { Product } from '../types/Product';

export const getAllProducts = (): Promise<Product[]> => {
  return fetch('/api/products.json').then(response => response.json());
};

export const getHotPrices: Promise<Product[]> = getAllProducts().then(
  products =>
    products
      .filter(product => product.fullPrice > product.price)
      .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price)),
);

export const getBrandNew: Promise<Product[]> = getAllProducts().then(products =>
  products.sort((a, b) => b.fullPrice - a.fullPrice),
);

export const getPhones: Promise<Product[]> = getAllProducts().then(products => {
  return products.filter(product => product.category === 'phones');
});

/* export const getPhones = (): Promise<Phone[]> => {
  return fetch('/api/phones.json').then(response => response.json());
}; */
