import { Phone } from '../types/Phone';
import { PhoneDetails } from '../types/PhoneDetails';
import { client } from '../utils/httpClient';

export const getData = () => {
  return client.get<Phone[]>('.json');
};

export const getPhoneDetails = (phoneId: string) => {
  return client.get<PhoneDetails>(`/${phoneId}.json`);
};
