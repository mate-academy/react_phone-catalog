import { Accessory } from '../types/product';
import { client } from '../utils/axiosClient';

export const getAccessories = () => {
  return client.get<Accessory[]>('/accessories.json');
};
