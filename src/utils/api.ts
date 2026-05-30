import { Product, ProductDetail } from '../types';

const BASE_URL = '/api';

async function fetchData<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}/${path}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}`);
  }

  return response.json();
}

export const getProducts = (): Promise<Product[]> =>
  fetchData<Product[]>('products.json');

export const getPhones = (): Promise<ProductDetail[]> =>
  fetchData<ProductDetail[]>('phones.json');

export const getTablets = (): Promise<ProductDetail[]> =>
  fetchData<ProductDetail[]>('tablets.json');

export const getAccessories = (): Promise<ProductDetail[]> =>
  fetchData<ProductDetail[]>('accessories.json');

export const getProductsByCategory = (
  category: 'phones' | 'tablets' | 'accessories',
): Promise<ProductDetail[]> => fetchData<ProductDetail[]>(`${category}.json`);

export const getProductDetail = async (
  category: string,
  itemId: string,
): Promise<ProductDetail | null> => {
  const items = await fetchData<ProductDetail[]>(`${category}.json`);

  return items.find(item => item.id === itemId) ?? null;
};

export const getSuggestedProducts = async (
  currentId: string,
): Promise<Product[]> => {
  const products = await getProducts();
  const others = products.filter(p => p.itemId !== currentId);
  const shuffled = [...others].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, 8);
};
