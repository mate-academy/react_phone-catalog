import { ProductType } from '../types/Product';
import { ProductWithDetails } from '../types/ProductWithDetails';
import { client } from '../helpers/FetchProducts';

export const getAccessories = () => {
  return client.get<ProductWithDetails[]>(
    `${ProductType.Accessories}.json`,
  );
};
