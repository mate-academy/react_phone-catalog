import { Product } from '../types/Product';

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch('api/products.json');

  if (!response.ok) {
    throw new Error(`Failed to load products: ${response.status}`);
  }

  const products: Product[] = await response.json();

  return products;
};
