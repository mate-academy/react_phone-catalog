import { ProductType } from '../types/Product';
import { ProductWithDetails } from '../types/ProductWithDetails';
import { client } from '../helpers/FetchProducts';

export const getPhones = () => {
  return client.get<ProductWithDetails[]>(`${ProductType.Phone}.json`);
};
