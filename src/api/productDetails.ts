import { getPhones } from './phones';
import { getTablets } from './tablets';
import { getAccessories } from './accessories';

import type { PhoneDetails, ProductDetails, TabletDetails } from '../types';

export type DetailedProduct = PhoneDetails | ProductDetails | TabletDetails;

export const getProductById = async (
  productId: string,
): Promise<DetailedProduct | undefined> => {
  try {
    const [phones, tablets, accessories] = await Promise.all([
      getPhones(),
      getTablets(),
      getAccessories(),
    ]);

    const allProducts: DetailedProduct[] = [
      ...phones,
      ...tablets,
      ...accessories,
    ];

    return allProducts.find(product => product.id === productId);
  } catch {
    throw new Error('Failed to fetch product details');
  }
};
