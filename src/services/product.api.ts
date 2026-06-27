import { Accessorie } from '../types/accessorie';
import { Phone } from '../types/phone';
import { Product } from '../types/product';
import { Tablet } from '../types/tablet';

const BASE_URL = import.meta.env.BASE_URL;

const buildUrl = (path: string): string => {
  const safeBase = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`;

  return `${safeBase}${path}`;
};

const request = <T>(path: string, errorMessage: string): Promise<T> => {
  return fetch(buildUrl(path)).then(response => {
    if (!response.ok) {
      throw new Error(errorMessage);
    }

    return response.json();
  });
};

export const getProducts = () =>
  request<Product[]>('api/products.json', 'Unable to load products');

export const getPhones = () =>
  request<Phone[]>('api/phones.json', 'Unable to load phones');

export const getTablets = () =>
  request<Tablet[]>('api/tablets.json', 'Unable to load tablets');

export const getAccessories = () =>
  request<Accessorie[]>('api/accessories.json', 'Unable to load accessories');
