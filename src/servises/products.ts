import { Product } from '../types/types';
import { getData } from '../utils/httpClient';

function getProducts() {
  return getData<Product[]>('/products.json');
}
export const fetchProducts = async (): Promise<Product[]> => {
  const data = await getProducts();
  return data && data.length ? (data as Product[]) : [];
};
