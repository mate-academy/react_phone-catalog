import { Category } from './Category';

export interface Product {
  id: string;
  category: Category;
  phoneId?: string;
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
}
