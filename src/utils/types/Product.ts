import { Category } from './Categories';

export type Product = {
  id: string;
  category: Category;
  itemId: string;
  name: string;
  capacity: string;
  fullPrice: number;
  price: number;
  color: string;
  image: string;
  screen: string;
  ram: string;
  year: number;
  quantity?: number;
};
