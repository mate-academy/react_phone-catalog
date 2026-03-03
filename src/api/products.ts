import {
  BaseProduct,
  CatalogProducts,
  PathType,
  PhoneType,
  TabletType,
} from '../types/Types';
import { getData } from './fetchClient';

export const getProducts = () => {
  return getData<CatalogProducts[]>(`${PathType.PRODUCTS}.json`);
};

export const getPhones = () => {
  return getData<PhoneType[]>(`${PathType.PHONES}.json`);
};

export const getTablets = () => {
  return getData<TabletType[]>(`${PathType.TABLETS}.json`);
};

export const getAccessories = () => {
  return getData<BaseProduct[]>(`${PathType.ACCESSORIES}.json`);
};
