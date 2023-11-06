import { Product } from '../types/Product';
import { client } from '../utils/fetchClient';

export const getProducts = () => {
  return client.get<Product[]>('/products.json');
};

export const getPhones = async () => {
  const products = await getProducts();

  return products.filter(product => product.type === 'phone');
};
