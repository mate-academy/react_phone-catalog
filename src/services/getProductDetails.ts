import { ProductDetails } from '../types/ProductDetails';
import { client } from '../utils/httpClient';

export const getProductDetails = (itemId: string) => {
  return client.get<ProductDetails>(`products/${itemId}.json`);
};
