import { client } from './fetchClient';
import { Product, ProductDetails } from './types/types';

export const getProducts = () => client.get<Product[]>('/products.json');

export const getPhones = () => client.get<ProductDetails[]>('/phones.json');

export const getTablets = () => client.get<ProductDetails[]>('/tablets.json');

export const getAccessories = () =>
  client.get<ProductDetails[]>('/accessories.json');
