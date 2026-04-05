import { Phone } from '../src/types/Phone';
import { Tablet } from './types/Tablet';
import { Accessory } from './types/Accessory';
import { Product } from './types/Product';
import { useEffect, useState } from 'react';

const BASE_URL = 'https://yar14k.github.io/react_phone-catalog/';


export const getPhones = async (): Promise<Phone[]> => {
  const res = await fetch(`${BASE_URL}api/phones.json`);

  return res.json();
};

export const getTablets = async (): Promise<Tablet[]> => {
  const res = await fetch(`${BASE_URL}api/tablets.json`);

  return res.json();
};

export const getAccessories = async (): Promise<Accessory[]> => {
  const res = await fetch(`${BASE_URL}api/accessories.json`);

  return res.json();
};

export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${BASE_URL}api/products.json`);

  return res.json();
};

export const getProduct = async (
  category: 'phones' | 'tablets' | 'accessories',
  id: string,
) => {
  switch (category) {
    case 'phones': {
      const somePhones = await getPhones();

      return somePhones.find(p => p.id.includes(id));
    }

    case 'tablets': {
      const someTablets = await getTablets();

      return someTablets.find(p => p.id.includes(id));
    }

    case 'accessories': {
      const someAccessories = await getAccessories();

      return someAccessories.find(p => p.id.includes(id));
    }

    default:
      return undefined;
  }
};

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);

    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
