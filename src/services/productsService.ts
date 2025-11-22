import { ProductDetails } from '../types/Product';

export async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  return response.json();
}

export function getAllPhones() {
  return fetchJson<ProductDetails[]>('/api/phones.json');
}

export function getAllTablets() {
  return fetchJson<ProductDetails[]>('/api/tablets.json');
}

export function getAllAccessories() {
  return fetchJson<ProductDetails[]>('/api/accessories.json');
}

export async function getProductDetailsById(id: string) {
  const [phones, tablets, accessories] = await Promise.all([
    getAllPhones(),
    getAllTablets(),
    getAllAccessories(),
  ]);

  return (
    phones.find(p => p.id === id) ||
    tablets.find(p => p.id === id) ||
    accessories.find(p => p.id === id) ||
    null
  );
}
