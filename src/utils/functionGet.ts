import { Accessorie } from '../types/accessories';
import { Phone } from '../types/phone';
import { Product } from '../types/product';
import { Tablet } from '../types/tablets';
import { client } from './fetchClient';

export const getPhones = () => {
  return client.get<Phone[]>('/phones.json');
};

export const getTablets = () => {
  return client.get<Tablet[]>('/tablets.json');
};

export const getAccessories = () => {
  return client.get<Accessorie[]>('/accessories.json');
};

export const getProducts = () => {
  return client.get<Product[]>('/products.json');
};
