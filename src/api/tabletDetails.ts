import { ProductDetails } from '@/features/products/types/productDetails';

export const fetchTabletDetails = async (): Promise<ProductDetails[]> => {
  const response = await fetch('/api/tablets.json');

  if (!response.ok) {
    throw new Error('Failed to fetch tablet details');
  }

  return response.json();
};
