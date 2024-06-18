import { ProductCategories } from '../types/ProductCategories';
import { ProductWithDetails } from '../types/ProductWithDetails';
import { client } from '../utils/fetchClient';

export const getTablets = () => {
  return client.get<ProductWithDetails[]>(ProductCategories.TABLETS + '.json');
};
