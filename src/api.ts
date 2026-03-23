import phones from '../public/api/phones.json';
import tablets from '../public/api/tablets.json';
import products from '../public/api/products.json';
import accessories from '../public/api/accessories.json';
import { Phone } from '../src/types/Phone';
import { Tablet } from './types/Tablet';
import { Accessory } from './types/Accessory';
import { Product } from './types/Product';

export const getPhones = (): Promise<Phone[]> => {
  return Promise.resolve(phones);
};

export const getTablets = (): Promise<Tablet[]> => {
  return Promise.resolve(tablets);
};

export const getAccessories = (): Promise<Accessory[]> => {
  return Promise.resolve(accessories);
};

export const getProducts = (): Promise<Product[]> => {
  return Promise.resolve(products);
};
