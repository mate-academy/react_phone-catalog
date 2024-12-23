import { Product } from '../types/Product';
import { ProductData } from '../types/ProductData';
import { client } from '../utils/fetchClients';

export const getAllProducts = () => {
  return client.get<Product[]>('api/products.json');
};

export const getPhones = () => {
  return client.get<ProductData[]>('api/phones.json');
};

export const getTablets = () => {
  return client.get<ProductData[]>('api/tablets.json');
};

export const getAccessories = () => {
  return client.get<ProductData[]>('api/accessories.json');
};
