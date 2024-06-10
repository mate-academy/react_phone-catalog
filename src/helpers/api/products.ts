import { DeviceDetails } from '../types/DeviceDetails';
import { Product } from '../types/Product';
import { client } from '../utils/fetchClient';

export const getProducts = () => {
  return client.get<Product[]>('/products.json');
};

export const getDeviceDetails = (id: string) => {
  return client.get<DeviceDetails>(`/products/${id}.json`);
};
