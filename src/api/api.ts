import { Product } from '../types/Product';

export const getAllProducts = (): Promise<Product[]> => {
  return fetch('/api/products.json').then(response => response.json());
};

export const getHotPrices: Promise<Product[]> = getAllProducts().then(
  products =>
    products
      .filter(product => product.fullPrice > product.price)
      .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
      .slice(0, 16),
);

export const brandNew: Promise<Product[]> = getAllProducts().then(products =>
  products.sort((a, b) => b.fullPrice - a.fullPrice),
);
