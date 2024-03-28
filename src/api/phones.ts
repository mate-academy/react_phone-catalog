import { Phone } from '../types/phones';
import { client } from '../utils/axiosClient';

export const getPhones = () => {
  return client.get<Phone[]>('/phones.json');
};
