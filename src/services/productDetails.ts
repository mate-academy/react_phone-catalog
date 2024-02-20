import { ProductDetails } from '../types/ProductDetails';
import { client } from '../utils/httpClient';

export function getProductDetails(itemId: string) {
  return client.get<ProductDetails>(`/products/${itemId}.json`);
}
