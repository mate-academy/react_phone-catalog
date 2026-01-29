import { Product } from '../types/Product';

const API_URL = `${import.meta.env.BASE_URL}/api/products.json`;

export const getProducts = (): Promise<Product[]> => {
  return fetch(API_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load products');
      }

      return response.json();
    })
    .catch(() => {
      return []; // Zwracamy pustą tablicę w razie błędu, żeby strona się nie wywaliła
    });
};
