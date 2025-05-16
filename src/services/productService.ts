import { Category, DetailedProduct, Product } from '../types';
import { wait, fetchJson } from '../utils';

const API_BASE_URL = 'https://vladtk.github.io/react_phone-catalog/api';

export const getProducts = async () => {
  await wait(500);

  return fetchJson<Product[]>(`${API_BASE_URL}/products.json`);
};

export const getDetailedProductsByCategory = async (category: Category) => {
  await wait(500);

  return fetchJson<DetailedProduct[]>(`${API_BASE_URL}/${category}.json`);
};
