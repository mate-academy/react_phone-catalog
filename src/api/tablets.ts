import { Tablet } from '../types/tablets';
import { client } from '../utils/axiosClient';

export const getAccessories = () => {
  return client.get<Tablet[]>('/tablets.json');
};
