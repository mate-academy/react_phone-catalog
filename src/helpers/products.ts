import { Category } from '../types/Category';
import { Product } from '../types/Product';
import { client } from '../utils/fetchClient';

export const getProducts = () => {
  return client.get<Product[]>('/products.json');
};

export const getPhones = () => {
  return getProducts()
    .then((products: Product[]) => {
      return [...products]
        .filter(item => item.category === Category.phone);
    });
};
