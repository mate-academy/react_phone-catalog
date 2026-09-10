import { Categories } from '@/types/Categories';

const BASE_URL = 'api';

const wait = (delay: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
};

const request = async (url: string) => {
  const response = await fetch(BASE_URL + url);

  await wait(1500);

  if (!response.ok) {
    throw new Error();
  }

  return response.json();
};

export const getProducts = async () => {
  return request('/products.json');
};

export const getCategory = async (category: Categories) => {
  return request(`/${category}.json`);
};
