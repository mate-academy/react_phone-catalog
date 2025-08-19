import { Product } from 'types/Product';
import { client } from '../utils/fetchClient';
import { ProductData } from 'types/ProductData';
import { CurrentCategory } from 'types/CurrentCategory';

export const getAllProducts = () => {
  return client.get<Product[]>('api/products.json');
};

export const getCategoryProduct = (category: CurrentCategory) => {
  return client.get<ProductData[]>(`api/${category}.json`);
};
