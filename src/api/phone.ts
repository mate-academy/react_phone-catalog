import { DetailsPhone } from '../type/DetailsPhone';
import { Phone } from '../type/Phone';
import { client } from '../utils/fetchClient';

export const getPhones = () => {
  return client.get<Phone[]>('/_new/products.json');
};

export const getPhone = (phoneId: string) => {
  return client.get<DetailsPhone>(`/_new/products/${phoneId}.json`);
};
