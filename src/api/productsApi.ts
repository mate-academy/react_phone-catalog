/* eslint-disable max-len */
import { PhoneDetails } from '../modules/ProductDetails/interfaces/PhoneDetailsInterface';

export const fetchProductById = async (
  category: 'phones' | 'tablets' | 'accessories',
  id: string,
): Promise<PhoneDetails | undefined> => {
  const response = await fetch(`/api/${category}.json`);
  const data: PhoneDetails[] = await response.json();

  return data.find(item => item.id === id);
};
