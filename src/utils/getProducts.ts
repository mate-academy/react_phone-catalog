import { Product } from '../types/Product';

export const getPhones = (prods: Product[]) => {
  const phones = prods.filter(p => p.type === 'phone');

  return phones;
};

export const getTablets = (prods: Product[]) => {
  const tablets = prods.filter(p => p.type === 'tablet');

  return tablets;
};

export const getAccessories = (prods: Product[]) => {
  const accessories = prods.filter(p => p.type === 'accessory');

  return accessories;
};
