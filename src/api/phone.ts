import { Product } from '../types/Product';
import { PhoneDetails } from '../types/PhoneDetails';
import { client } from '../utils/fetchClient';
import { OldApiPhoneDetails } from '../types/OldApiPhoneDetails';

export const getPhones = () => {
  return client.get<Product[]>('/_new/products.json');
};

export const getPhoneDetails = (phoneId: string) => {
  return client.get<PhoneDetails>(`/_new/products/${phoneId}.json`);
};

export const getProductDetails = (phoneId: string) => {
  return client.get<OldApiPhoneDetails>(`/api/products/${phoneId}.json`);
};

export const getProducts = () => {
  return client.get<Product[]>('/api/products.json');
};
