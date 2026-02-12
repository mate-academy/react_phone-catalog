import { Phones } from '../types/Phones';
import { client } from '../utils/fetchClient';

export const getPhones = () => {
  return client.get<Phones[]>('/phones.json');
};
