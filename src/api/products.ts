import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';
import { client } from './fetchClient';

export const getAllProducts = () => {
  const url = '/products.json';

  return client.get<Product[]>(url);
};

export const getProductDetails = (product: string, model: string) => {
  return client.get<ProductDetails>(`/products/${product}-${model}.json`);
};
