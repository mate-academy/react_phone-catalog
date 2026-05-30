import { FullProduct } from '../types/FullProduct';
import { client } from '../utils/fetchClient';

export const getPhones = () => {
  return client.get<FullProduct[]>('/phones.json');
};

export const getTablets = () => {
  return client.get<FullProduct[]>('/tablets.json');
};

export const getAccessories = () => {
  return client.get<FullProduct[]>('/accessories.json');
};
