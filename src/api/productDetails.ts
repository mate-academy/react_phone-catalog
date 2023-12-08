import { ProductDetails } from '../types/ProductDetails';
import { client } from '../utils/fetchClient';

export const getProduct = (id: string) => {
  return client.get<ProductDetails>(`/${id}.json`);
};
