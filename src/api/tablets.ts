import { client } from '../utils/fetchClient';
import { ProductInfo } from '../types/ProductInfo';

export const getTablets: () => Promise<ProductInfo[]> = () => {
  return client.get<ProductInfo[]>('/tablets.json');
};
