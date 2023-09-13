import { Product } from '../../types/product';
import { client } from './fetchClient';

const BASE_URL = 'https://mate-academy.github.io'
  + '/react_phone-catalog/_new/products';

export const productApi = {
  getAll: client.get<Product[]>(BASE_URL, '.json'),
  getDetails: (productSlug: string) => client.get(BASE_URL, `${productSlug}.json`),
};
