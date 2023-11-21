import { PhoneDetail } from '../types/PhoneDetail';
import { Phone } from '../types/Phone';
import { client } from './fetchClient';

export const getPhones = () => {
  return client.get<Phone[]>('/_new/products.json');
};

export const getPhone = (phoneId: string) => {
  return client.get<PhoneDetail>(`/_new/products/${phoneId}.json`);
};
