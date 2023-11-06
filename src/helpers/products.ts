import { Category } from '../types/Category';
import { PhoneInfo } from '../types/PhoneInfo';
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

export const getTablets = () => {
  return getProducts()
    .then((products: Product[]) => {
      return [...products]
        .filter(item => item.category === Category.tablet);
    });
};

export const getAccessories = () => {
  return getProducts()
    .then((products: Product[]) => {
      return [...products]
        .filter(item => item.category === Category.accessory);
    });
};

export const getProductInfo = (id: string) => {
  return client.get<PhoneInfo>(`/products/${id}.json`);
};
