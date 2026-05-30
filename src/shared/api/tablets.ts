import { ProductDetailBase } from './types';

export async function getTablets(): Promise<ProductDetailBase[]> {
  const response = await fetch('/api/tablets.json');

  if (!response.ok) {
    throw new Error('Failed to load tablets');
  }

  return response.json();
}
