import { Device } from '../types/product';
import { client } from '../utils/axiosClient';

export const getTablets = () => {
  return client.get<Device[]>('/tablets.json');
};
