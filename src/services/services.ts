import { asset } from '../helper';
import type { Product } from '../types/Product';

const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

const fetchDataWithDelay = async <T>(src: string, ms: number): Promise<T> => {
  await delay(ms);

  const response = await fetch(src);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
};

export const getProductsByCategory = async (
  category: string,
): Promise<Product[]> => {
  return fetchDataWithDelay<Product[]>(asset(`/api/${category}.json`), 500);
};

export const getAllProducts = async (): Promise<Product[]> => {
  const categories = ['phones', 'tablets', 'accessories'];

  const productsArrays = await Promise.all(
    categories.map(category => getProductsByCategory(category)),
  );

  return productsArrays.flat();
};

export const getProductById = async (
  id: string,
  category?: string,
): Promise<Product | undefined> => {
  const products = category
    ? await getProductsByCategory(category)
    : await getAllProducts();

  return products.find(product => product.id === id);
};

export const getSuggestedProducts = async (num: number): Promise<Product[]> => {
  const allProducts = await getAllProducts();
  const shuffled = [...allProducts].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
};
