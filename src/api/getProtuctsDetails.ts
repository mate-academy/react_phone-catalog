import { client } from '../helpers/fetchClient';
import { ProductDetails } from '../helpers/types/ProductDetails';

export const getProductDetails = (productId: string) => {
  return client.get<ProductDetails>(`/products/${productId}.json`);
};
