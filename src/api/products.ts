import { Product } from '@/features/products/types/product';

export const fetchAllProducts = async (): Promise<Product[]> => {
  const response = await fetch('/api/products.json');

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
};
