import catalog from '../../public/api/products.json';
import type { Category, Product } from '../types';

type ApiProduct = {
  category: Category;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  capacity: string;
  color: string;
  year: number;
  image: string;
};

const colorValues: Record<string, string> = {
  black: '#1c1c1e',
  white: '#f5f5f7',
  silver: '#e3e4e5',
  gold: '#d5b78c',
  yellow: '#f9dc63',
  red: '#ce3836',
  purple: '#76628a',
  blue: '#5b7fa8',
  green: '#617d72',
  pink: '#f1b6c4',
  coral: '#ef8669',
  spacegray: '#55565b',
  'space-gray': '#55565b',
  midnightgreen: '#46564c',
  midnight: '#262730',
  starlight: '#efe9dc',
  'rose-gold': '#d8a59b',
  'sky-blue': '#89b4d1',
};

export const products: Product[] = (catalog as ApiProduct[]).map(item => ({
  id: item.itemId,
  name: item.name,
  category: item.category,
  price: item.price,
  fullPrice: item.fullPrice,
  year: item.year,
  image: `${import.meta.env.BASE_URL}${item.image}`,
  colors: [colorValues[item.color] || '#75767f'],
  capacities: [item.capacity],
  description: `${item.name} brings a bright display, dependable performance and a refined design for every day.`,
}));
