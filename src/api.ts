import {Details} from './type/Details';
import {Products} from './type/Productes';

const API_URL = `${import.meta.env.BASE_URL}api`;

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

async function fetchJson<T>(url: string): Promise<T> {
  await wait(300);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Request failed: ${response.status} ${response.statusText}`,
    );
  }

  return response.json() as Promise<T>;
}

async function fetchProducts(): Promise<Products[]> {
  return fetchJson<Products[]>(`${API_URL}/products.json`);
}

export async function getProducts(): Promise<Products[]> {
  return fetchProducts();
}

export async function getPhones(): Promise<Products[]> {
  const products = await fetchProducts();

  return products.filter(product => product.category === 'phones');
}

export async function getTablet(): Promise<Products[]> {
  const products = await fetchProducts();

  return products.filter(product => product.category === 'tablets');
}

export async function getAccessories(): Promise<Products[]> {
  const products = await fetchProducts();

  return products.filter(product => product.category === 'accessories');
}

export async function fetchDetails(
  category: string,
  itemId: string,
): Promise<Details | undefined> {
  const data = await fetchJson<Details[]>(`${API_URL}/${category}.json`);

  return data.find(detail => detail.id === itemId);
}
