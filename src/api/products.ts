import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';
import { client } from './fetchClient';

export const getProducts = () => {
  return client.get<Product[]>('/products.json');
};

export const getProductDetails = (productId: string) => {
  return client.get<ProductDetails>(`/products/${productId}.json`);
};
