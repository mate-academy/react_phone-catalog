import { Product, ProductDetails, Category } from '../types';

const BASE_URL = `${import.meta.env.BASE_URL}api`;

async function get<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}/${endpoint}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${response.status}`);
  }

  return response.json();
}

export const getProducts = (): Promise<Product[]> =>
  get<Product[]>('products.json');

export const getPhones = (): Promise<ProductDetails[]> =>
  get<ProductDetails[]>('phones.json');

export const getTablets = (): Promise<ProductDetails[]> =>
  get<ProductDetails[]>('tablets.json');

export const getAccessories = (): Promise<ProductDetails[]> =>
  get<ProductDetails[]>('accessories.json');

export const getProductsByCategory = (category: Category): Promise<Product[]> =>
  getProducts().then(products =>
    products.filter(product => product.category === category),
  );

const CATEGORY_ENDPOINTS: Record<Category, string> = {
  phones: 'phones.json',
  tablets: 'tablets.json',
  accessories: 'accessories.json',
};

export const getProductDetails = (
  category: Category,
  productId: string,
): Promise<ProductDetails | null> =>
  get<ProductDetails[]>(CATEGORY_ENDPOINTS[category]).then(
    list => list.find(item => item.id === productId) ?? null,
  );

export const getSuggestedProducts = (
  excludeId: string,
  count = 10,
): Promise<Product[]> =>
  getProducts().then(all => {
    const pool = all.filter(p => p.itemId !== excludeId);
    const shuffled = [...pool].sort(() => Math.random() - 0.5);

    return shuffled.slice(0, count);
  });
