import { ProductDetails } from '@/features/products/types/productDetails';
import { delayOnPurpose } from './delayOnPurpose';

export const fetchAccessoriesDetails = async (): Promise<ProductDetails[]> => {
  const response = await fetch('/api/accessories.json');

  if (!response.ok) {
    throw new Error('Failed to fetch accessories details');
  }

  await delayOnPurpose(1500);

  return response.json();
};
