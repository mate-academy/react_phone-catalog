import { getProducts } from './utils/fetchProducts';

export const getPhones = () => {
  return getProducts(`api/phones.json`);
};

export const getTablets = () => {
  return getProducts(`api/tablets.json`);
};

export const getAccessories = () => {
  return getProducts(`api/accessories.json`);
};

// export const getProductByColor = ({ color, category }: { color: string; category: string; }) => {
//   return getProducts(`/products?name=${category}&color=${color}`);
// };
