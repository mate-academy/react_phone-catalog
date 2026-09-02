import { Product } from '../types/Product';

const BASE_URL = import.meta.env.BASE_URL;

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${BASE_URL}api/products.json`);

  if (!response.ok) {
    throw new Error('Failed to load products');
  }

  return response.json();
};

export const getPhones = async (): Promise<Product[]> => {
  const response = await fetch(`${BASE_URL}api/phones.json`);

  if (!response.ok) {
    throw new Error('Failed to load phones');
  }

  return response.json();
};

export const getTablets = async (): Promise<Product[]> => {
  const response = await fetch(`${BASE_URL}api/tablets.json`);

  if (!response.ok) {
    throw new Error('Failed to load tablets');
  }

  return response.json();
};

export const getAccessories = async (): Promise<Product[]> => {
  const response = await fetch(`${BASE_URL}api/accessories.json`);

  if (!response.ok) {
    throw new Error('Failed to load accessories');
  }

  return response.json();
};
