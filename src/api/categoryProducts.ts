import { ProductSpecs } from '../types/ProductSpecs';
import { client } from '../utils/fetchClient';

export const getCategoryProducts = (category: string) => {
  return client.get<ProductSpecs[]>(`api/${category}.json`);
};
