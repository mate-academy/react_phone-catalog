import { ProductListItem } from './types';

export async function getProducts(): Promise<ProductListItem[]> {
  const response = await fetch('/api/products.json');

  if (!response.ok) {
    throw new Error('Failed to load products');
  }

  return response.json();
}
