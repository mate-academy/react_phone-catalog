import { Device } from '../types/device';
import { Product } from '../types/product';
import { client } from '../utils/fetchClient';

export const getPhones = () => {
  return client.get<Device[]>('/phones.json');
};

export const getTablets = () => {
  return client.get<Device[]>('/tablets.json');
};

export const getAccessories = () => {
  return client.get<Device[]>('/accessories.json');
};

export const getProducts = () => {
  return client.get<Product[]>('/products.json');
};
