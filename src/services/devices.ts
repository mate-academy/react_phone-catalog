import { API_ACCESSORIES, API_PHONES, API_TABLETS } from '../constants/api';
import { ProductDetail } from '../types/ProductDetail';
import { request } from '../utils/utils';

export const getDevice = (url: string) => {
  return request<ProductDetail[]>(url);
};

export const getPhones = (): Promise<ProductDetail[]> => {
  return getDevice(API_PHONES);
};

export const getTablets = (): Promise<ProductDetail[]> => {
  return getDevice(API_TABLETS);
};

export const getAccessories = (): Promise<ProductDetail[]> => {
  return getDevice(API_ACCESSORIES);
};
