import { Category } from '../types/Category';
import { Product } from '../types/Product';
import { FullProductData } from '../types/FullProductData';
import { client } from '../utils/fetchClient';

export const getProducts = () => {
  return client.get<Product[]>('products.json');
};

export const getProduct = (category: Category, id: string) => {
  return client
    .get<FullProductData[]>(`${category}.json`)
    .then(items => items.find(item => item.id === id));
};

export const getCategoryProducts = (category: Category) => {
  return client.get<FullProductData[]>(`${category}.json`);
};
