import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

const BASE_URL = '/api/';

const fetchData = async <T>(path: string): Promise<T[]> => {
  const response = await fetch(BASE_URL + path);

  if (!response.ok) {
    throw new Error('Failed to fetch');
  }

  return response.json();
};

export const loadProducts = (path: string) => fetchData<Product>(path);
export const loadProductDetails = (path: string) =>
  fetchData<ProductDetails>(path);
