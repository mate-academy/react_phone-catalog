import type { Category } from './Category';

export type Product = {
  id: number;
  category: Category;
  item_id: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  images: string[];
  imageUrls?: string[];
  namespace_id: string;
};
