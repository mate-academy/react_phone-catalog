import { client } from '../utils/fetchClient';
import { Product } from '../types/Product';
import { ProductDetailsType } from '../types/ProductDetails';

export const getProducts = () => {
  return client.get<Product[]>('/products.json');
};

export const getProductDetails = (productId: string) => {
  return client.get<ProductDetailsType>(`/products/${productId}.json`);
};
