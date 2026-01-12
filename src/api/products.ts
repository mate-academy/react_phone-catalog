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
  const res = await fetch('/api/products.json');
  const all: Array<{
    id: number;
    itemId: string;
    category: string;
    name: string;
    fullPrice: number;
    price: number;
    year: number;
    image: string;
    capacity: string;
    color: string;
    screen?: string;
    ram?: string;
  }> = await res.json();

  return all
    .filter(p => !category || p.category === category)
    .map(p => ({
      id: p.itemId,
      itemId: p.itemId,
      category: p.category,
      name: p.name,
      fullPrice: p.fullPrice,
      price: p.price,
      year: p.year,
      image: p.image,
      capacity: p.capacity,
      color: p.color,
      screen: p.screen,
      ram: p.ram,
    }));
}

export async function getProducts(category: Category): Promise<Product[]> {
  const res = await fetch(`/api/${category}.json`);

  return res.json();
}
