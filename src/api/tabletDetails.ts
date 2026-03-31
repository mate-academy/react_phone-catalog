import { ProductDetails } from '@/features/products/types/productDetails';
// import { delayOnPurpose } from './delayOnPurpose';

export const fetchTabletDetails = async (): Promise<ProductDetails[]> => {
  const response = await fetch('./api/tablets.json');

  if (!response.ok) {
    throw new Error('Failed to fetch tablet details');
  }

  // await delayOnPurpose(1000);

  return response.json();
};
