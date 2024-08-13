import { API_PHONES, API_PRODUCTS, API_TABLETS } from '../constants/api';
import { ProductDetail } from '../types/ProductDetail';
import { httpRequest } from '../utils/httpRequest';

export const getPhones = (): Promise<ProductDetail[]> => {
  return httpRequest(API_PHONES);
};

export const getTablets = (): Promise<ProductDetail[]> => {
  return httpRequest(API_PRODUCTS);
};

export const getAccessories = (): Promise<ProductDetail[]> => {
  return httpRequest(API_TABLETS);
};
