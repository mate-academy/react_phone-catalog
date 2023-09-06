import { Product } from '../types/Product';

export const getPhones = (prods: Product[]) => {
  const phones = prods.filter(p => p.category === 'phones');

  return phones;
};

export const getTablets = (prods: Product[]) => {
  const tablets = prods.filter(p => p.category === 'tablets');

  return tablets;
};

export const getAccessories = (prods: Product[]) => {
  const accessories = prods.filter(p => p.category === 'accessories');

  return accessories;
};
