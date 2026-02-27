import { BaseProduct, CatalogProducts } from '../types/ProductTypes';
import { getData } from './fetchClient';

export const getProducts = () => {
  return getData<CatalogProducts[]>('/products.json');
};

export const getPhones = () => {
  return getData<BaseProduct[]>('/phones.json');
};

export const getTablets = () => {
  return getData<BaseProduct[]>('/tablets.json');
};

export const getAccessories = () => {
  return getData<BaseProduct[]>('/accessories.json');
};
