import {
  AccessoryType,
  PhoneType,
  ProductType,
  TabletType,
} from '../types/productsType';
import { getItems } from './fetch';

export const getFrom = {
  getPhones: async (): Promise<PhoneType[]> =>
    getItems<PhoneType[]>('api/phones.json'),
  getTables: async (): Promise<TabletType[]> =>
    getItems<TabletType[]>('api/tablets.json'),
  getAccessories: async (): Promise<AccessoryType[]> =>
    getItems<AccessoryType[]>('api/accessories.json'),
  getProducts: async (): Promise<ProductType[]> =>
    getItems<ProductType[]>('api/products.json'),
};
