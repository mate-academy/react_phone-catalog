import { Product } from '../types/Product';
import { ProductData } from '../types/ProductData';

export async function getData<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Can`t get data from the server');
  }

  return response.json();
}

export const getSuggestedProducts = (
  products: Product[],
  count: number = 5,
): Product[] => {
  if (products.length === 0) {
    return [];
  }

  const shuffled = [...products].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, count);
};

export const getProducts = () => {
  return getData<Product[]>('api/products.json');
};

export const getCategoryData = (categoryData: string | undefined) => {
  return getData<ProductData[]>(`api/${categoryData}.json`);
};
