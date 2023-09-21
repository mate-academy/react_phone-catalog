/* eslint-disable max-len */
export type Sizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'Iphone 14 PRO MAX' | 'Iphone 14 PRO' | 'Iphone 14 PLUS' | 'Iphone 14';
export type Colors = 'black' | 'silver' | 'kuroso';

export type Good = {
  [index: string]: string | number | any[] | null,
  name: string,
  type: string,
  drop: string,
  description: string,
  images: string[],
  sizes: Sizes[],
  colors: Colors[]
  year: number,
  id: number,
  count: number,
  price: number,
  sale: number | null,
  seoUrl: string,
  translationSlug: string,
};
