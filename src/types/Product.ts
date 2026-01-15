import { Category } from './Category';

export interface Product {
  id: number;
  category: Category;
  itemId: string;
  name: string;
  fullPrice: number;
  price?: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
}

export interface ProductDescription {
  title: string;
  text: string[];
}

export interface ProductDetails {
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
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
  processor: string;
}

export type ProductDetailsWithArticle = ProductDetails & {
  article: Product['id'];
};
