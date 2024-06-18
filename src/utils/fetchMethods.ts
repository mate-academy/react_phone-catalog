import { Products } from '../types/ContextType/Products';
import { client } from './fetchClient';
import { Phones } from '../types/ContextType/Phones';
import { Tablets } from '../types/ContextType/Tablets';
import { Accessories } from '../types/ContextType/Accessories';

export const getGadgets = (url: string) => {
  return client.get<Products[]>(url);
};

export const getPhones = (url: string) => {
  return client.get<Phones[]>(url);
};

export const getTablets = (url: string) => {
  return client.get<Tablets[]>(url);
};

export const getAccessories = (url: string) => {
  return client.get<Accessories[]>(url);
};
