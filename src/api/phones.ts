import { Device } from '../types/product';
import { client } from '../utils/axiosClient';

export const getPhones = () => {
  return client.get<Device[]>('/phones.json');
};
