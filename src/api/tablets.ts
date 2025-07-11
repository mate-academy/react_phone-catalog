import { ProductType } from '../types/Product';
import { ProductWithDetails } from '../types/ProductWithDetails';
import { client } from '../helpers/FetchProducts';

export const getTablets = () => {
  return client.get<ProductWithDetails[]>(`${ProductType.Tablet}.json`);
};
