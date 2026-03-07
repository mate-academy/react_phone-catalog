import { Category } from '../../../types/Category';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getProducts = async () => {
  const response = await fetch(`${import.meta.env.BASE_URL}/api/products.json`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await response.json();

  await wait(500);

  return data;
};

export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(
    `${import.meta.env.BASE_URL}/api/categories.json`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  return response.json();
};
