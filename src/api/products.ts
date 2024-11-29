import { Category } from '../types/category';
import { fetchData } from '../utils/fetchClient';

export const getAllProducts = async () => {
  const data = await fetchData('/products.json');

  return data;
};

export const getProductsByCategory = async (category: Category) => {
  const data = await fetchData(`/${category}.json`);

  return data;
};
