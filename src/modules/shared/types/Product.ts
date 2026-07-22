import { ProductCategory } from './ProductCategory';

export type Product = {
  id: number;
  category: ProductCategory;
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

export type ProductDescription = {
  title: string;
  text: string[];
};

export type ProductDetails = {
  id: string;
  category: ProductCategory;
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
  zoom?: string;

  cell: string[];
};
