import { Product } from '../types';
import { client } from '../utils/fetchClient';

export const getPhones = async () => {
  const allProducts = await client.get<Product[]>('/api/products.json');

  return allProducts.filter(product => product.type === 'phone');
};
