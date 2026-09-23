import type { Category } from './Category';

export type Product = {
  id: number;
  category: Category;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  year: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  image: string;
};
