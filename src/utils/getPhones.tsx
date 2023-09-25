import { getProducts } from './httpClient';

export const getPhones = async () => {
  const res = await getProducts();

  return [...res].filter(item => item.category === 'phones');
};
