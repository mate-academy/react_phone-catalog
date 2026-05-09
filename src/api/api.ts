import { Category, Product, ProductDetails } from '../types/Product';

const IMAGE_BASE =
  'https://cdn.jsdelivr.net/gh/mate-academy/react_phone-catalog@master/public/';

const get = async <T>(path: string): Promise<T> => {
  const response = await fetch(`${import.meta.env.BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.status}`);
  }

  return response.json() as Promise<T>;
};

export const getProducts = () => get<Product[]>('api/products.json');

export const getCategoryProducts = (category: Category) =>
  get<Product[]>(`api/${category}.json`);

const detailCache = new Map<Category, ProductDetails[]>();

const loadCategoryDetails = async (
  category: Category,
): Promise<ProductDetails[]> => {
  const cached = detailCache.get(category);
  if (cached) return cached;
  const data = await get<ProductDetails[]>(`api/${category}.json`);
  detailCache.set(category, data);
  return data;
};

export const getProductDetails = async (
  itemId: string,
): Promise<ProductDetails> => {
  const list = await getProducts();
  const summary = list.find(p => p.itemId === itemId);
  if (!summary) {
    throw new Error(`Product ${itemId} not found`);
  }
  const details = await loadCategoryDetails(summary.category);
  const found = details.find(d => d.id === itemId);
  if (!found) {
    throw new Error(`Details for ${itemId} not found in ${summary.category}`);
  }
  return found;
};

export const buildImageUrl = (path: string) =>
  path.startsWith('http') ? path : `${IMAGE_BASE}${path}`;
