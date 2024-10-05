import { CategoriesTypes } from './CategoriesTypes';

export interface Product {
  id: number;
  category: CategoriesTypes;
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
