import { ProductDetails } from '../types/ProductDetails';
import { Category, Product } from '../types/Product';
import { getProducts } from './products';

// ВИПРАВЛЕНО: Безпечне формування базового шляху
const baseUrl = import.meta.env.BASE_URL;
const BASE_URL = baseUrl.endsWith('/') ? `${baseUrl}api` : `${baseUrl}/api`;

const categoryFileMap: Record<Category, string> = {
  phones: 'phones.json',
  tablets: 'tablets.json',
  accessories: 'accessories.json',
};

async function request<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  return response.json();
}

export const getProductDetails = async (
  productId: string,
): Promise<ProductDetails | undefined> => {
  const products = await getProducts();
  const shortProduct = products.find(p => p.itemId === productId);

  if (!shortProduct) {
    return undefined;
  }

  const fileName = categoryFileMap[shortProduct.category];
  const items = await request<ProductDetails[]>(`${BASE_URL}/${fileName}`);

  return items.find(item => item.id === productId);
};

export const getSuggestedProducts = async (
  category: Category,
  excludeId: string,
  count = 4,
): Promise<Product[]> => {
  const products = await getProducts();
  const filtered = products.filter(
    p => p.category === category && p.itemId !== excludeId,
  );

  const shuffled = [...filtered].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, count);
};

export const getProductVariants = async (
  category: Category,
  namespaceId: string,
): Promise<ProductDetails[]> => {
  const fileName = categoryFileMap[category];
  const items = await request<ProductDetails[]>(`${BASE_URL}/${fileName}`);

  return items.filter(item => item.namespaceId === namespaceId);
};
