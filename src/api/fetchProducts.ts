import { Product } from '../types/products';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch('./api/products.json');

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
};
