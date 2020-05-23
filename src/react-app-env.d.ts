// / <reference types="react-scripts" />

type Link = {
  name: string;
  url: string;
  exact?: boolean;
};

interface Good {
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
  [key: string]: string | string[];
  [key: string]: {
    [key: string]: string | string[] | boolean;
  };
}

interface Banners {
  path: string;
  position?: number;
  alt?: string;
}
