import type { Product } from './Product';

export type ProductDescriptionBlock = {
  title: string;
  text: string[];
};

export type Phone = Product & { category: 'phones' };
export type Tablet = Product & { category: 'tablets' };
export type Accessory = Product & { category: 'accessories' };
