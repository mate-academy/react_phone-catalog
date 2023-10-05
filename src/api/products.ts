import { Device } from '../types/Device';
import { Product } from '../types/Product';
import { client } from '../utils/fetchClient';

export const getProducts = () => {
  return client.get<Product[]>('.json');
};

export const getDevice = (deviceId: string) => {
  return client.get<Device>(`/${deviceId}.json`);
};
