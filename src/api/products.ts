import { client } from '../utils/fetchClient';
import { Product, Phone, Tablet, Accessory, Category } from '../types';

export const getProducts = () => {
  return client.get<Product[]>('/products.json');
};

export const getProductsByCategory = <
  T extends Phone[] | Tablet[] | Accessory[],
>(
  category: Category,
) => {
  return client.get<T>(`/${category}.json`);
};
