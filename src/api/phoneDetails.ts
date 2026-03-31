import { ProductDetails } from '@/features/products/types/productDetails';
// import { delayOnPurpose } from './delayOnPurpose';

export const fetchPhoneDetails = async (): Promise<ProductDetails[]> => {
  const response = await fetch(`${import.meta.env.BASE_URL}api/phones.json`);

  if (!response.ok) {
    throw new Error('Failed to fetch phone details');
  }

  // await delayOnPurpose(1000);

  return response.json();
};
