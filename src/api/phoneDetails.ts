import { ProductDetails } from '@/features/products/types/productDetails';

export const fetchPhoneDetails = async (): Promise<ProductDetails[]> => {
  const response = await fetch('/api/phones.json');

  if (!response.ok) {
    throw new Error('Failed to fetch phone details');
  }

  return response.json();
};
