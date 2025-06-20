import { getProducts } from './getData';
import { Product } from '../types/Product';

export const fetchProducts = async (): Promise<Product[]> => {
  return getProducts();
};
