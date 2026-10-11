import type { ProductDetails } from '../types';

export const getAccessories = async (): Promise<ProductDetails[]> => {
  const response = await fetch('./api/accessories.json');

  if (!response) {
    throw new Error('Failed to fetch accessories');
  }

  return response.json();
};
