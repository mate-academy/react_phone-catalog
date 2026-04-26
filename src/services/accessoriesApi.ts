import { ProductDetails } from '../types/ProductDetails';

export const getAccessories = async (): Promise<ProductDetails[]> => {
  const response = await fetch('../../public/api/accessories.json');

  if (!response.ok) {
    throw new Error('Failed to fetch accessories');
  }

  return response.json();
};
