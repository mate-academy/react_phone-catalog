import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';
import { client } from '../utils/fetch';

export const getProducts = (): Promise<Product[]> => {
  return client.get<Product[]>('products.json');
};

export const getProductById = (productId: string): Promise<ProductDetails> => {
  return client.get<ProductDetails>(`products/${productId}.json`);
};
