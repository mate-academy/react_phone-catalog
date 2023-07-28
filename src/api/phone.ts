import { Phone } from '../types/Phone';
import { client } from '../utils/fetchClient';

export const getPhones = () => {
  return client.get<Phone[]>('/_new/products.json');
};
