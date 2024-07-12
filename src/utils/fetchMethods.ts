import { Product } from '../types/ContextType/Product';
import { client } from './fetchClient';
import { Category } from '../enums/Category';
import { Gadgets } from '../types/ContextType/Gadgets';
export const getProducts = (url: string) => {
  return client.get<Product[]>(`/${url}.json`);
};

export const getGadgets = (type: Category) => {
  return client.get<Gadgets[]>(`/${type}.json`);
};
