import { Accessory } from '../types/accessories';
import { client } from '../utils/axiosClient';

export const getAccessories = () => {
  return client.get<Accessory[]>('/accessories.json');
};
