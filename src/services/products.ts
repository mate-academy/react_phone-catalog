import { Product } from '../types/Product';
import { getData } from '../utils/httpClient';

export const getProducts = async (): Promise<Product[]> => {
  try {
    return (await getData<Product[]>('/products.json')) ?? [];
  } catch (err) {
    throw new Error(`${err}`);
  }
};
