import { IProduct } from '../types';
import { client } from '../utils/fetchClient';

export const getTablets = async () => {
  const products = await client.get<IProduct[]>('/api/products.json');

  return products.filter(product => product.type === 'tablet');
};
