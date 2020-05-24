// / <reference types="react-scripts" />

type Link = {
  name: string;
  title?: string;
  url: string;
  type?: string;
  exact?: boolean;
};

interface Good {
  [key: string]: number | string;
  age: number;
  type: string;
  id: string;
  imageUrl: string;
  name: string;
  snippet: string;
  price: number;
  discount: number;
  screen: string;
  capacity: string;
  ram: string;
}

interface GoodDetail {
  id: string;
  name: string;
  images: Array<string>;
  description: string;
  [key?: string]: string | string[];
  [key?: string]: {
    [key: string]: string | string[] | boolean;
  };
}

interface Banners {
  path: string;
  position?: number;
  alt?: string;
}

type SortType = {
  name: string;
  type: string;
  field: 'price' | 'name';
  typeField: 'string' | 'number';
  isReverse: boolean;
  isDefault?: true;
};

type PerPage = {
  name: string;
};
