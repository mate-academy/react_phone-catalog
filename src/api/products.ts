import { Product } from '../types/Product';

// ВИПРАВЛЕНО: Безпечне формування базового шляху
const baseUrl = import.meta.env.BASE_URL;
const BASE_URL = baseUrl.endsWith('/') ? `${baseUrl}api` : `${baseUrl}/api`;

async function request<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  return response.json();
}

export const getProducts = (): Promise<Product[]> => {
  return request<Product[]>(`${BASE_URL}/products.json`);
};

export const getPhones = (): Promise<Product[]> => {
  return request<Product[]>(`${BASE_URL}/products.json`).then(products =>
    products.filter(p => p.category === 'phones'),
  );
};

export const getTablets = (): Promise<Product[]> => {
  return request<Product[]>(`${BASE_URL}/products.json`).then(products =>
    products.filter(p => p.category === 'tablets'),
  );
};

export const getAccessories = (): Promise<Product[]> => {
  return request<Product[]>(`${BASE_URL}/products.json`).then(products =>
    products.filter(p => p.category === 'accessories'),
  );
};
