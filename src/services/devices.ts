import { API_ACCESSORIES, API_PHONES, API_TABLETS } from '../constants/api';
import { ProductDetail } from '../types/ProductDetail';
import { httpRequest } from '../utils/httpRequest';

export const getGadget = (url: string) => {
  return httpRequest<ProductDetail[]>(url);
};

export const getPhones = (): Promise<ProductDetail[]> => {
  return getGadget(API_PHONES);
};

export const getTablets = (): Promise<ProductDetail[]> => {
  return getGadget(API_TABLETS);
};

export const getAccessories = (): Promise<ProductDetail[]> => {
  return getGadget(API_ACCESSORIES);
};
