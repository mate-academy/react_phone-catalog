import phones from '../../public/api/phones.json';
import product from '../../public/api/products.json';
// import tablet from '../../public/api/tablets.json';
// import accessories from '../../public/api/accessories.json';
import { Accessories, Phone } from '../types/ProductDetails';
import { Product } from '../types/typeRpoduct';
// import { Tablets } from '../types/ProductDetails';

const delay = () => new Promise(resolve => setTimeout(resolve, 500));

export const getPhones = (): Promise<Phone[]> => {
  return delay().then(() => phones);
};

export const fetchProducts = (): Promise<Product[]> => {
  return delay().then(() => product);
};

// export const fetchTable = (): Promise<Tablets[]> => {
//   return delay().then(() => tablet);
// };

// export const fetchAccessories = (): Promise<Accessories[]> => {
//   return delay().then(() => accessories);
// };
