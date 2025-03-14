import phones from '../../public/api/phones.json';
import tablet from '../../public/api/tablets.json';
import accessories from '../../public/api/accessories.json';
import {
  Accessory,
  Phone,
  ProductDetails,
  Tablet,
} from '../types/ProductTypes';

const delay = () => new Promise(resolve => setTimeout(resolve, 500));

export const getPhones = (): Promise<Phone[]> => {
  return delay().then(() => phones);
};

export const fetchTable = (): Promise<Tablet[]> => {
  return delay().then(() => tablet);
};

export const fetchAccessories = (): Promise<Accessory[]> => {
  return delay().then(() => accessories);
};

export const fetchAllProducts = async (): Promise<ProductDetails[]> => {
  const [phonesData, tabletsData, accessoriesData] = await Promise.all([
    getPhones(),
    fetchTable(),
    fetchAccessories(),
  ]);

  return [...phonesData, ...tabletsData, ...accessoriesData];
};
