import { Category } from '../../../types/Category';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getProducts = async () => {
  const response = await fetch('./api/products.json');
  const data = await response.json();

  await wait(500);

  return data;
};

export const getCategories = (): Promise<Category[]> => {
  return fetch(`${import.meta.env.BASE_URL}api/categories.json`).then(res => {
    if (!res.ok) {
      throw new Error('Failed to fetch categories');
    }

    return res.json();
  });
};
