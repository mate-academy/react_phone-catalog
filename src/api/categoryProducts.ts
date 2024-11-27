import { ProductSpecs } from '../types/Product';
import { client } from '../utils/httpClient';

export const getCategoryProducts = (category: string) => {
  return client.get<ProductSpecs[]>(`api/${category}.json`);
};
