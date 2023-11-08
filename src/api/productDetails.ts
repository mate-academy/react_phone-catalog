import { ProductDetails } from '../types/ProductDetails';
import { client } from '../utils/fetchClient';

export const getProductDetails = (productId: string) => {
  return client.get<ProductDetails>(`/products/${productId}.json`);
};
