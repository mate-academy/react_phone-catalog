import { withBase } from '../modules/shared/utils/baseUrl';

export type Product = {
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
};

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(withBase('api/products.json'));

  if (!response.ok) {
    throw new Error('Unable to load products');
  }

  return response.json();
};

export const getSuggestedProducts = (
  products: Product[],
  excludeItemId: string,
  count = 4,
): Product[] => {
  const pool = products.filter(p => p.itemId !== excludeItemId);

  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool.slice(0, count);
};
