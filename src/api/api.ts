import { Product, ProductDetails } from '../types';
import { client } from '../utils/fetchClient';

export const getProducts = () => client.get<Product[]>('/products.json');

export const getPhones = () => {
  return client.get<ProductDetails[]>('/phones.json');
};

export const getTablets = () => {
  return client.get<ProductDetails[]>('/tablets.json');
};

export const getAccessories = () => {
  return client.get<ProductDetails[]>('/accessories.json');
};
