/* eslint-disable @typescript-eslint/indent */
import { Product } from '../types/Product';

// eslint-disable-next-line operator-linebreak
const BASE_URL = `${import.meta.env.BASE_URL}/api`;

function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function get<T>(url: string): Promise<T> {
  const fullURL = `${BASE_URL}/${url}.json`;

  return wait(300)
    .then(() => fetch(fullURL))
    .then(res => {
      if (!res.ok) {
        throw new Error(`Failed to fetch ${fullURL}: ${res.statusText}`);
      }

      return res.json();
    });
}

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

export const getProducts = () => get<Product[]>('products');

export const getPhone = async (): Promise<Product[]> => {
  const products = await getProducts();

  return products.filter(item => item.category === 'phones');
};

export const getTablet = async (): Promise<Product[]> => {
  const products = await getProducts();

  return products.filter(item => item.category === 'tablets');
};

export const getAccessorie = async (): Promise<Product[]> => {
  const products = await getProducts();

  return products.filter(item => item.category === 'accessories');
};

export const getSuggestedProducts = async (
  category?: string,
  currentProductId?: string,
): Promise<Product[]> => {
  const products = await get<Product[]>('products');
  let filtered = category
    ? products.filter(
        item => item.category?.toLowerCase() === category.toLowerCase(),
      )
    : products;

  if (currentProductId) {
    filtered = filtered.filter(
      item =>
        item.itemId !== currentProductId &&
        item.id !== Number(currentProductId),
    );
  }

  return shuffleArray(filtered);
};
