import { Products } from '../types/ContextType/Products';
import { client } from './fetchClient';
import { Category } from '../enums/Category';
import { Gadgets } from '../types/ContextType/Gadgets';
export const getProducts = (url: string) => {
  return client.get<Products[]>(`/${url}.json`);
};

export const getPhones = (type: Category) => {
  return client.get<Gadgets[]>(`/${type}.json`);
};
