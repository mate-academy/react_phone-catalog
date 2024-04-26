import { Device } from '../types/product';
import { client } from '../utils/axiosClient';

export const getAccessories = () => {
  return client.get<Device[]>('/accessories.json');
};
