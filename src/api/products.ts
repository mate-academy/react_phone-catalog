import { Category } from '../types';

export interface ProductDescription {
  title: string;
  text: string[];
}

export interface Product {
  id: string;
  category: string;
  namespaceId?: string;
  itemId?: string;
  name: string;
  capacityAvailable?: string[];
  capacity?: string;
  priceRegular?: number;
  priceDiscount?: number;
  colorsAvailable?: string[];
  color?: string;
  images?: string[];
  description?: ProductDescription[];
  screen?: string;
  resolution?: string;
  processor?: string;
  ram?: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
  year: number;
  image: string;
  fullPrice?: number;
  price?: number;
}

export async function getProductList(category?: Category): Promise<Product[]> {
  const res = await fetch('./api/products.json');
  const all: Product[] = await res.json();

  return all.filter(p => !category || p.category === category);
}

export async function getProducts(category: Category): Promise<Product[]> {
  const res = await fetch(`./api/${category}.json`);

  return res.json();
}
