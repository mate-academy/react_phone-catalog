import { Category } from './enums';

export type Product = {
  id: number;
  category: Category;
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

export type Paragraph = {
  title: string;
  text: string[];
};

export type ProductDetails = {
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
  description: Paragraph[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera?: string;
  zoom?: string;
  cell: string[];
};

export type Pagination = number | null;

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
