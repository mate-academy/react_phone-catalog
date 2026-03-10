import { Accessory, Phone, Product, Tablet } from '../types';

const BASE_URL = import.meta.env.BASE_URL;

export default async (): Promise<Product[]> => {
  const response = await fetch(`${BASE_URL}api/products.json`);
  const data = await response.json();

  return data;
};

export const getPhones = async (): Promise<Phone[]> => {
  const response = await fetch(`${BASE_URL}api/phones.json`);
  const data = await response.json();

  return data;
};

export const getTablets = async (): Promise<Tablet[]> => {
  const response = await fetch(`${BASE_URL}api/tablets.json`);
  const data = await response.json();

  return data;
};

export const getAccessories = async (): Promise<Accessory[]> => {
  const response = await fetch(`${BASE_URL}api/accessories.json`);
  const data = await response.json();

  return data;
};

export const getProductById = async (
  itemId: string,
  category: string,
): Promise<Phone | Tablet | Accessory | null> => {
  if (category === 'phones') {
    const data = await getPhones();

    return data.find(item => item.id === itemId) ?? null;
  }

  if (category === 'tablets') {
    const data = await getTablets();

    return data.find(item => item.id === itemId) ?? null;
  }

  if (category === 'accessories') {
    const data = await getAccessories();

    return data.find(item => item.id === itemId) ?? null;
  }

  return null;
};

export const getSuggestedProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${BASE_URL}api/products.json`);
  const data: Product[] = await response.json();
  const shuffled = [...data].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, 8);
};
