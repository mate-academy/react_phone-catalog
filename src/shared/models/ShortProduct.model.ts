import { Category } from './category.model';

export interface ShortProduct {
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
}
