import { Accessories } from '../types/Accessories';
import { client } from '../utils/fetchClient';

export const getAccessories = () => {
  return client.get<Accessories[]>('/accessories.json');
};
