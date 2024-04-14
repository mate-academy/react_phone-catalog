import { Product } from '../types/product';
import { ProductDetails } from '../types/productDetails';
import { client } from '../utils/fetch';

export const getProducts = (): Promise<Product[]> => {
  return client.get<Product[]>('/products.json');
};

export const getProductsByCategory = (
  category: string,
): Promise<ProductDetails[]> => {
  return client.get<ProductDetails[]>(`/${category}.json`);
};
