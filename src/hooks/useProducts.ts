import productsData from '../../public/api/products.json';
import phonesData from '../../public/api/phones.json';
import tabletsData from '../../public/api/tablets.json';
import accessoriesData from '../../public/api/accessories.json';

export type Products = {
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice?: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
}[];
export type Phones = typeof phonesData;
export type Tablets = typeof tabletsData;
export type Accessories = typeof accessoriesData;

export type AllTypes = Products | Phones | Tablets | Accessories;

export const useProducts = () => {
  return productsData;
};

export const usePhones = () => {
  return phonesData;
};

export const useTablets = () => {
  return tabletsData;
};

export const useAccessories = () => {
  return accessoriesData;
};
