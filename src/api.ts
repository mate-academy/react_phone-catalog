import phones from '../public/api/phones.json';
import tablets from '../public/api/tablets.json';
import products from '../public/api/products.json';
import accessories from '../public/api/accessories.json';
import { Phone } from '../src/types/Phone';
import { Tablet } from './types/Tablet';
import { Accessory } from './types/Accessory';
import { Product } from './types/Product';

export const getPhones = (): Promise<Phone[]> => {
  return Promise.resolve(phones as Phone[]);
};

export const getTablets = (): Promise<Tablet[]> => {
  return Promise.resolve(tablets as Tablet[]);
};

export const getAccessories = (): Promise<Accessory[]> => {
  return Promise.resolve(accessories as Accessory[]);
};

export const getProducts = (): Promise<Product[]> => {
  return Promise.resolve(products);
};

export const getProduct = async (
  category: 'phones' | 'tablets' | 'accessories',
  id: string,
) => {
  switch (category) {
    case 'phones': {
      const somePhones = await getPhones();

      return somePhones.find(p => p.id === id);
    }

    case 'tablets': {
      const someTablets = await getTablets();

      return someTablets.find(p => p.id === id);
    }

    case 'accessories': {
      const someAccessories = await getAccessories();

      return someAccessories.find(p => p.id === id);
    }

    default:
      return undefined;
  }
};
