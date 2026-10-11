import type { Product } from '../types';

// pega dados da API

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch('./api/products.json');

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
};
