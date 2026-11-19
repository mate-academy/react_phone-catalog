import { Product } from './types';
import { getBaseUrl } from '../shared/utils/images';

const DETAIL_CATEGORIES = ['phones', 'tablets', 'accessories'];

interface CatalogItem {
  id?: number;
  itemId?: string;
  category: string;
  name: string;
  fullPrice: number;
  price: number;
  screen?: string;
  capacity?: string;
  color?: string;
  ram?: string;
  year?: number;
  image?: string;
}

const baseUrl = getBaseUrl();

const fetchJson = async (file: string): Promise<unknown> => {
  const response = await fetch(`${baseUrl}api/${file}`);

  if (!response.ok) {
    throw new Error(`Failed to load ${file}`);
  }

  return response.json();
};

export const getProductsByCategory = async (
  category: string,
): Promise<Product[]> => {
  const data = (await fetchJson(`${category}.json`)) as Product[];

  return data;
};

export const getDetailedProducts = async (): Promise<Product[]> => {
  const lists = await Promise.all(
    DETAIL_CATEGORIES.map(async category => {
      const data = (await fetchJson(`${category}.json`)) as Product[];

      return data.map(item => ({
        ...item,
        images: item.images.map(
          image => `${baseUrl}${image.replace(/^\//, '')}`,
        ),
      }));
    }),
  );

  return lists.flat();
};

export const getProductById = async (
  id: string,
): Promise<Product | undefined> => {
  const products = await getDetailedProducts();
  const product = products.find(item => item.id === id);

  if (!product) {
    return undefined;
  }

  return product;
};

export const getSuggestedProducts = async (
  product: Product,
  count = 4,
): Promise<Product[]> => {
  const products = await getDetailedProducts();
  const others = products.filter(
    item => item.namespaceId !== product.namespaceId,
  );
  const shuffled = [...others].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, count);
};

export const getCatalogProducts = async (): Promise<Product[]> => {
  const data = (await fetchJson('products.json')) as CatalogItem[];

  return data.map(item => ({
    id: String(item.itemId ?? item.id),
    category: item.category,
    name: item.name,
    capacity: item.capacity,
    color: item.color,
    year: item.year,
    screen: item.screen,
    ram: item.ram,
    price: item.price,
    fullPrice: item.fullPrice,
    images: item.image ? [`${baseUrl}${item.image.replace(/^\//, '')}`] : [],
  }));
};
