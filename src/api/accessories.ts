import { ProductCategories } from '../types/ProductCategories';
import { ProductWithDetails } from '../types/ProductWithDetails';
import { client } from '../utils/fetchClient';

export const getAccessories = () => {
  return client.get<ProductWithDetails[]>(
    ProductCategories.ACCESSORIES + '.json',
  );
};
