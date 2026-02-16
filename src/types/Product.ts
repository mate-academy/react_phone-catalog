import { Category } from './categories';

export interface Product {
  id: string;
  category: Category;
  namespaceId?: string;
  name: string;
  // capacity & options
  capacityAvailable?: string[];
  capacity?: string;

  // price fields
  price?: number; // legacy
  priceRegular?: number;
  priceDiscount?: number;
  oldPrice?: number;
  discount?: number;

  // colors
  colorsAvailable?: string[];
  color?: string;

  // media & description
  images?: string[];
  // structured description: array of parts with title and text paragraphs
  description?: DescriptionPart[];

  // device-specific fields (phones/tablets)
  screen?: string;
  resolution?: string;
  processor?: string;
  ram?: string;
  camera?: string;
  zoom?: string;
  cell?: string[];

  slug?: string;
  [key: string]: unknown;
}

export interface DescriptionPart {
  title?: string;
  // most files use an array of paragraphs for text
  text?: string[];
}

export default Product;
