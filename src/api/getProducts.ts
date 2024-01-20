import { getData } from '../helpers/fetchClient';
import { Product } from '../helpers/types/Product';

export const getProducts = (): Promise<Product[]> => {
  return getData('/products.json');
};
