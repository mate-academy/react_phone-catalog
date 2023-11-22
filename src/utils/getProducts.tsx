import { getProducts } from './httpClient';

export const getAccessories = async () => {
  const res = await getProducts();

  return [...res].filter(item => item.category === 'accessories');
};

export const getPhones = async () => {
  const res = await getProducts();

  return [...res].filter(item => item.category === 'phones');
};

export const getTablets = async () => {
  const res = await getProducts();

  return [...res].filter(item => item.category === 'tablets');
};
