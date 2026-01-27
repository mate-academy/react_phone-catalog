import { getData } from './http';
import { Phone } from '../types/Phone';
import { Tablet } from '../types/Tablet';
import { Accessory } from '../types/Accessory';
import { Product } from '../types/Product';

export const getPhones = () => {
  return getData<Phone[]>('/api/phones.json');
};

export const getTablets = () => {
  return getData<Tablet[]>('/api/tablets.json');
};

export const getAccessories = () => {
  return getData<Accessory[]>('/api/accessories.json');
};

export const getProducts = () => {
  return getData<Product[]>('/public/api/products.json');
};

export const getProductDetails = async (productId: string) => {
  const phones = await getPhones();
  const tablets = await getTablets();
  const accessories = await getAccessories();

  const allProducts = [...phones, ...tablets, ...accessories];

  const product = allProducts.find(item => item.id === productId);

  return product;
};
