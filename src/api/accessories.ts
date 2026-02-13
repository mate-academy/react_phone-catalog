import { client } from '../utils/fetchClient';
import { ProductInfo } from '../types/ProductInfo';

export const getAccessories: () => Promise<ProductInfo[]> = () => {
  return client.get<ProductInfo[]>('/accessories.json');
};
