import { client } from './helpers/httpClient';
import { Product } from './types/Product';
import { ProductDetails } from './types/ProductDetails';

export const getProducts = () => {
  return client.get<Product[]>('products.json');
};

export const getProductDetails = (id: string) => {
  return client.get<ProductDetails>(`products/${id}.json`);
};
