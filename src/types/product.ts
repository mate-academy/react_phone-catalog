export enum Categories {
  Phones = 'phones',
  Accessories = 'accessories',
  Tablets = 'tablets',
}

export type Product = {
  id: number;
  category: Categories;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
};

export interface ProductDescription {
  title: string;
  text: string[];
}

export type ProductItem = {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: ProductDescription[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera?: string;
  zoom: string;
  cell: string[];
};
