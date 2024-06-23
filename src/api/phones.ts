import { ProductCategories } from '../types/ProductCategories';
import { ProductWithDetails } from '../types/ProductWithDetails';
import { client } from '../utils/fetchClient';

export const getPhones = () => {
  return client.get<ProductWithDetails[]>(ProductCategories.PHONES + '.json');
};
