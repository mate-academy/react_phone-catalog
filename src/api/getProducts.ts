import { Products } from '../types/Products';
import { getData } from './getData';

export const getProducts = async (): Promise<Products[]> => {
  const phones = await getData<Products[]>('/api/products.json');

  return phones;
};
