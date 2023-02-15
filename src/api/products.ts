import { ItemInfo } from '../types/ItemInfo';
import { Product } from '../types/Product';
import { client } from '../utils/fetchClient';

export const getProducts = async () => {
  return client.get<Product[]>('');
};

export const getProductInfo = async (productId: string) => {
  return client.get<ItemInfo>(productId);
};
