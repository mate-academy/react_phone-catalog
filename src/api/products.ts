import { Product } from '../types/Product';
import { client } from '../utils/fetchClient';
import { Details } from '../types/Details';

export const getProducts = () => {
  return client.get<Product[]>('/products.json');
};

export const getProductsDetails = (productId: string) => {
  return client.get<Details>(`/products/${productId}.json`);
};
