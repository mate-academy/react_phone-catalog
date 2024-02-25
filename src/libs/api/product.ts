import { IProductDetails } from '../types';
import { client } from '../utils/fetchClient';

export const getProductDetails = (productId: string) => {
  return client.get<IProductDetails>(`/api/products/${productId}.json`);
};
