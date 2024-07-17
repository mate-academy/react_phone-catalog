import { Category } from '../../types/Category';
import { Product } from '../../types/Product';

/* eslint-disable */

// for softer colors and easier background-color management
export const availableColors = {
  "black": '#333333',
  "gold": '#FFD983',
  "yellow": '#FFFF00',
  "green": '#008000',
  "midnightgreen": '#4B5320',
  "silver": '#C0C0C0',
  "spacegray":  '#708090',
  "red": '#FF6347',
  "white": '#FFFFFF',
  "purple": '#9370DB',
  "coral": '#FF6F61',
  "rosegold": '#B76E79',
  "midnight": '#191970',
  "spaceblack": '#2F4F4F',
  "blue": '#87CEEB',
  "pink": '#FFC0CB',
  "sierrablue": '#5D8AA8',
  "graphite":  '#383838',
  "space gray": '#708090',
  "space-gray": '#708090',
  "rose gold": '#B76E79',
  "sky blue": '#87CEEB',
  "starlight": '#E2E2E2',
}

/* eslint-enable */

export const handleLocalStorage = (key: 'favorites' | 'cart') => {
  const fetchedItems = localStorage.getItem(key);

  return JSON.parse(fetchedItems as string) || [];
};

export const getCategory = (arr: Product[], category: Category) => {
  return arr.filter(product => product.category === category);
};

export const localeStorageHandler = {
  add(key: 'favorites' | 'cart', arr: Product[], value: Product) {
    const updated = [...arr, value];

    localStorage.setItem(key, JSON.stringify(updated));
  },

  remove(key: 'favorites' | 'cart', arr: Product[], valueId: string) {
    const updated = arr.filter((favorite: Product) => favorite.id !== valueId);

    localStorage.setItem(key, JSON.stringify(updated));
  },
};

export const transformToUpperCase = (value: string) => {
  return value === 'ram' ? 'RAM' : value[0].toUpperCase() + value.slice(1);
};

export const getHexColor = (color: keyof typeof availableColors) => {
  return availableColors[color];
};

export function getPages(value: number) {
  const toReturn: number[] = [];

  for (let i = 1; i <= value; i++) {
    toReturn.push(i);
  }

  return toReturn;
}
