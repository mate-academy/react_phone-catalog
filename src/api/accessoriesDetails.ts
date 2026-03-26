import { ProductDetails } from '@/features/products/types/productDetails';

export const fetchAccessoriesDetails = async (): Promise<ProductDetails[]> => {
  const response = await fetch('/api/accessories.json');

  if (!response.ok) {
    throw new Error('Failed to fetch accessories details');
  }

  return response.json();
};
