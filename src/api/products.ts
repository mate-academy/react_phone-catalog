import { client } from '../utils/fetch';
import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

export const getProducts = (): Promise<Product[]> => {
  return client.get<Product[]>('products.json');
};

export const getProductById = (productId: string): Promise<ProductDetails> => {
  return client.get<ProductDetails>(`products/${productId}.json`);
};
