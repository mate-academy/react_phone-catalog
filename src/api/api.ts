import { Accessories } from '../types/Accessories';
import { Phones } from '../types/Phones';
import { Products } from '../types/Products';
import { Tablets } from '../types/Tablets';
import { getData } from './http';

export const getPhones = () => {
  return getData<Phones[]>('./api/phones.json');
};

export const getAccessories = () => {
  return getData<Accessories[]>('./api/accessories.json');
};

export const getProducts = () => {
  return getData<Products[]>('./api/products.json');
};

export const getTablets = () => {
  return getData<Tablets[]>('./api/tablets.json');
};

// Promise.all запускає всі три запити одночасно, а не по черзі.
export const getProductDetails = async (productId: string) => {
  const allProducts = await Promise.all([
    getPhones(),
    getTablets(),
    getAccessories(),
  ]);

  const product = allProducts.flat().find(prod => prod.id === productId);

  return product;
};

export const getProductDetailsAll = async () => {
  const allProducts = await Promise.all([
    getPhones(),
    getTablets(),
    getAccessories(),
  ]);

  return allProducts.flat();
};
