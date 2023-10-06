import { DetailsPhone } from '../Type/DetailsPhone';
import { Phone } from '../Type/Phone';
import { client } from '../utils/fetchClient';

export const getPhones = () => {
  return client.get<Phone[]>('/_new/products.json');
};

export const getPhone = (phoneId: string) => {
  return client.get<DetailsPhone>(`/_new/products/${phoneId}.json`);
};
