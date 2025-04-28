import { Accessory } from '../types/Accessory';
import { Phone } from '../types/Phone';
import { Product } from '../types/Product';
import { Tablet } from '../types/Tablet';
import { client } from './fetchClient';

export const getProducts = async (): Promise<Product[]> => {
  return client.get('api/products.json');
};

export const getPhones = async (): Promise<Phone[]> => {
  return client.get('api/phones.json');
};

export const getTablets = async (): Promise<Tablet[]> => {
  return client.get('api/tablets.json');
};

export const getAccessories = async (): Promise<Accessory[]> => {
  return client.get('api/accessories.json');
};
