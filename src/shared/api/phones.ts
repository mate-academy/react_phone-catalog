import { ProductDetailBase } from './types';

export async function getPhones(): Promise<ProductDetailBase[]> {
  const response = await fetch('/api/phones.json');

  if (!response.ok) {
    throw new Error('Failed to load phones');
  }

  return response.json();
}
