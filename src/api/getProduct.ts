import Product from '../types/Product';
import { client } from '../utils/fetchClient';

export const getPhones = () => {
  return client.get<Product[]>('/phones.json');
};

export const getTablets = () => {
  return client.get<Product[]>('/tablets.json');
};

export const getAccessories = () => {
  return client.get<Product[]>('/accessories.json');
};
