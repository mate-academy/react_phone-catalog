import { Product } from '@/features/products/types/product';
import { delayOnPurpose } from './delayOnPurpose';

export const fetchAllProducts = async (): Promise<Product[]> => {
  const response = await fetch('/api/products.json');

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  await delayOnPurpose(1500);

  return response.json();
};
