import { Product } from '../types/Product';

const fetchData = async (endpoint: string): Promise<unknown> => {
  const cleanEndpoint = endpoint.replace(/^\//, '');
  const urls = [
    cleanEndpoint,
    `${import.meta.env.BASE_URL}${cleanEndpoint}`,
    `/${cleanEndpoint}`,
  ];

  for (const url of urls) {
    try {
      const response = await fetch(url);

      if (response.ok) {
        return await response.json();
      }
    } catch {
      // try next path
    }
  }

  throw new Error(`Failed to fetch ${endpoint}`);
};

export const getProducts = async (): Promise<Product[]> => {
  return (await fetchData('api/products.json')) as Product[];
};

export const getCategoryDetails = async (
  category: string,
): Promise<unknown[]> => {
  return (await fetchData(`api/${category}.json`)) as unknown[];
};

export const getProductById = async (
  category: string,
  itemId: string,
): Promise<unknown | null> => {
  const items = (await getCategoryDetails(category)) as Array<{ id: string }>;

  return items.find(item => item.id === itemId) || null;
};
