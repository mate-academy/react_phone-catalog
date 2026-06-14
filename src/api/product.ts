import { client } from './fetchClient';
import { Product } from '../shared/types';

const FAVORITES_LOCAL_STORAGE = 'favorites';

export function getProducts(): Promise<Product[]> {
  return client.get<Product[]>('./api/products.json');
}

export const getProductsByCategory = async (
  category: string,
): Promise<Product[]> => {
  const products = await getProducts();

  return products.filter(product => product.category === category);
};

export const getFavorites = (): Product[] => {
  const favoritesAsJson = localStorage.getItem(FAVORITES_LOCAL_STORAGE);

  if (!favoritesAsJson) {
    localStorage.setItem(FAVORITES_LOCAL_STORAGE, '[]');
  }

  return favoritesAsJson ? JSON.parse(favoritesAsJson) : [];
};

export const saveProductToFavorites = (product: Product) => {
  const products = getFavorites();

  localStorage.setItem(
    FAVORITES_LOCAL_STORAGE,
    JSON.stringify([...products, product]),
  );
};

export const removeProductFromFavorites = (id: number) => {
  const products = getFavorites();

  localStorage.setItem(
    FAVORITES_LOCAL_STORAGE,
    JSON.stringify(products.filter(product => product.id !== id)),
  );
};
