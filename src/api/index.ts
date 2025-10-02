// src/api/index.ts
// Funções para buscar dados da API

import { Product, ProductCategory, ProductDetails } from '../types';

const API_URL = 'https://mate-academy.github.io/phone-catalog-api';

// delay artificial para simular carregamento
const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

async function request<T>(path: string): Promise<T> {
  await delay(200);

  // monta sempre a URL absoluta
  const res = await fetch(`${API_URL}/${path.replace(/^\//, '')}`);

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  return res.json();
}

export const api = {
  getProducts: () => request<Product[]>('products.json'),
  getPhones: () => request<ProductDetails[]>('phones.json'),
  getCategories: () => request<ProductCategory[]>('categories.json'),
  // adicione aqui outros endpoints que precisar
};
