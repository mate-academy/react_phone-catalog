import { Product, ProductDetails } from '../types/product';

export async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  return response.json();
}

export function getAllProducts() {
  return fetchJson<Product[]>('/api/products.json');
}

function getAllPhones() {
  return fetchJson<ProductDetails[]>('/api/phones.json');
}

function getAllTablets() {
  return fetchJson<ProductDetails[]>('/api/tablets.json');
}

function getAllAccessories() {
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
