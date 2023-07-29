import { Phone } from '../types/Phone';
import { PhoneDetails } from '../types/PhoneDetails';
import { client } from '../utils/fetchClient';

export const getPhones = () => {
  return client.get<Phone[]>('/_new/products.json');
};

export const getPhoneDetails = (phoneId: string) => {
  return client.get<PhoneDetails>(`/_new/products/${phoneId}.json`);
};
