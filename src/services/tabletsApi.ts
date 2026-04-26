import { ProductDetails } from '../types';

export const getTablets = async (): Promise<ProductDetails[]> => {
  const response = await fetch('/api/tablets.json');

  if (!response.ok) {
    throw new Error('Failed to fetch tablets');
  }

  return response.json();
};
