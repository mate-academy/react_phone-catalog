/* eslint-disable no-console */
/* eslint-disable max-len */
// import { Iphone } from '../types/Iphone';
// import { client } from '../utils/fetchClient';

import { Iphone } from '../types/Iphone';
import { PhoneDescription } from '../types/PhoneDescription';

export interface Iphone1 {
  id: string;
  namespaceId: string;
  name: string;
}

export interface IphoneDetailed extends Iphone {
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: PhoneDescription[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
}

// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/products.json';

function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function get<T>(productId: string): Promise<T> {
  const fullURL = `${BASE_URL}/products/${productId}.json`;

  // we add some delay to see now the laoder works
  return wait(300)
    .then(() => fetch(fullURL))
    .then(res => res.json());
}

export const getIphones = () => get<Iphone[]>('/iphones');

export const getProductById = async (productId: string): Promise<IphoneDetailed> => {
  const BASE_URL1 = 'https://mate-academy.github.io/react_phone-catalog/_new/products';
  const fullURL1 = `${BASE_URL1}/${productId}.json`;

  const response = await fetch(fullURL1);
  const data = await response.json();

  return data as IphoneDetailed;
};

export const getImages = async (path: string): Promise<string> => {
  const BASE_URL1 = 'https://mate-academy.github.io/react_phone-catalog/_new/products';
  const fullURL1 = `${BASE_URL1}/${path}`;

  console.log(fullURL1);
  const response = await fetch(fullURL1);
  const data = await response.json();

  return data;
};

export function getAll(): Promise<Iphone[]> {
  return fetch(BASE_URL)
    .then(response => response.json());
}

export const getNewIphones = () => {
  return getAll()
    .then(items => items.sort((a, b) => {
      return b.year - a.year;
    }))
    .then(items => items.slice(0, 12));
};

export const getHotPrice = () => {
  return getAll()
    .then(items => items.sort((a, b) => {
      return ((b.price - b.fullPrice) / b.fullPrice) * 100
        - ((a.price - a.fullPrice) / a.fullPrice) * 100;
    }));
  // .then(items => items.slice(0, 8));
};
