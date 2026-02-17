import type { Product } from '../types/Product';
import { wait } from './wait';

export const getProducts = async (): Promise<Product[]> => {
  await wait(200);

  const response = await fetch(`${import.meta.env.BASE_URL}api/products.json`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
};
