import { Product, ProductDetails } from '../types/Product';
import { getPublicPath } from '../utils/pathHelper';

async function fetchData<T>(path: string): Promise<T> {
  const url = getPublicPath(`api/${path}`);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.statusText}`);
  }

  return response.json();
}

export const getProducts = (): Promise<Product[]> =>
  fetchData<Product[]>('products.json');

export const getPhones = (): Promise<ProductDetails[]> =>
  fetchData<ProductDetails[]>('phones.json');

export const getTablets = (): Promise<ProductDetails[]> =>
  fetchData<ProductDetails[]>('tablets.json');

export const getAccessories = (): Promise<ProductDetails[]> =>
  fetchData<ProductDetails[]>('accessories.json');

export const getProductById = async (
  category: string,
  id: string,
): Promise<ProductDetails | null> => {
  let items: ProductDetails[] = [];

  if (category === 'phones') {
    items = await getPhones();
  } else if (category === 'tablets') {
    items = await getTablets();
  } else if (category === 'accessories') {
    items = await getAccessories();
  }

  return items.find(item => item.id === id) || null;
};

export const getSuggestedProducts = async (
  currentId: string,
): Promise<Product[]> => {
  const all = await getProducts();
  const filtered = all.filter(p => p.itemId !== currentId);
  const shuffled = filtered.sort(() => Math.random() - 0.5);

  return shuffled.slice(0, 8);
};
