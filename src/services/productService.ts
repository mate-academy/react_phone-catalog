// services/productService.ts

import { Product } from '../interfaces/Product';

const API_URL = '/api/products.json';

let productsCache: Product[] | null = null;

async function getAll(): Promise<Product[]> {
  if (productsCache !== null) {
    return productsCache;
  }

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const products: Product[] = await response.json();

  productsCache = products;

  return products;
}

async function getNewest(n: number): Promise<Product[]> {
  const products = await getAll();

  return [...products].sort((a, b) => b.year - a.year).slice(0, n);
}

async function getBiggestDiscounts(n: number): Promise<Product[]> {
  const products = await getAll();

  return [...products]
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, n);
}

export const productService = {
  getAll,
  getNewest,
  getBiggestDiscounts,
};
