import { Devices } from './types/devices';
import { Product } from './types/products';

const BASE_URL = import.meta.env.BASE_URL;

function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function get<T>(url: string): Promise<T> {
  const fullURL = `${BASE_URL}/api/${url}.json`;

  return wait(300)
    .then(() => fetch(fullURL))
    .then(res => res.json());
}

export const getProducts = () => get<Product[]>('products');

export const getAllProducts = (params: string) => get<Devices[]>(`${params}`);

export const getDeviceById = (itemId: string, category: string) =>
  get<Devices[]>(`${category}`).then(devices => {
    return devices.find(device => device.id === itemId);
  });
