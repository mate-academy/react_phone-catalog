import { getProducts } from './utils/fetchProducts';

export const getPhones = () => {
  return getProducts(`/phones.json`);
};

export const getTablets = () => {
  return getProducts(`/tablets.json`);
};

export const getAccessories = () => {
  return getProducts(`/accessories.json`);
};

// export const getProductByColor = ({ color, category }: { color: string; category: string; }) => {
//   return getProducts(`/products?name=${category}&color=${color}`);
// };
