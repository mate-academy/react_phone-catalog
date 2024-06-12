import { Products } from '../types/ContextType/Products';
import { client } from './fetchClient';

export const getGadgets = (url: string) => {
  return client.get<Products[]>(url);
};
