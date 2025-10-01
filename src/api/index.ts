// src/api/index.ts - API functions for data fetching
import { Product, ProductCategory, ProductDetails } from '../types';

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

async function request<T>(url: string): Promise<T> {
  // add tiny delay to visualize loaders
  await delay(200);
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  return res.json();
}

export const api = {
  getProducts: (category: ProductCategory) =>
    request<Product[]>(`/api/${category}.json`),

  getProductDetails: (id: string) =>
    request<ProductDetails>(`/api/products/${id}.json`),

  getSuggestedProducts: async (take = 10) => {
    const all = await request<Product[]>(`/api/phones.json`);

    return all.sort(() => Math.random() - 0.5).slice(0, take);
  },
};
