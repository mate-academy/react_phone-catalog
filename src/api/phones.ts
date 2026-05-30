import { client } from '../utils/fetchClient';
import { ProductInfo } from '../types/ProductInfo';

export const getPhones: () => Promise<ProductInfo[]> = () => {
  return client.get<ProductInfo[]>('/phones.json');
};
