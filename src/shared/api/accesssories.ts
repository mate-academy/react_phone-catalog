import { ProductDetailBase } from './types';

export async function getAccessories(): Promise<ProductDetailBase[]> {
  const response = await fetch('/api/accessories.json');

  if (!response.ok) {
    throw new Error('Failed to load accessories');
  }

  return response.json();
}
