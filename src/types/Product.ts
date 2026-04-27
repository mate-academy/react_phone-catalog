export type Product = {
  id: number;
  category: 'phones' | 'tablets' | 'accessories';
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

export type Category = 'phones' | 'tablets' | 'accessories';

export interface ProductDescription {
  title: string;
  text: string[];
}

export interface BaseProduct {
  id: string;
  category: Category;
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

  cell: string[];
}

export interface Phone extends BaseProduct {
  category: 'phones';
  camera: string;
  zoom: string;
}

export interface Tablet extends BaseProduct {
  category: 'tablets';
  camera: string;
  zoom: string;
}

export interface Accessory extends BaseProduct {
  category: 'accessories';
}

export type Products = Phone | Tablet | Accessory;
