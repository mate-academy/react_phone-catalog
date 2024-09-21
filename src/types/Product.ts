import { Category } from './Category';
import { Color } from './Color';

export interface Product {
  id: string;
  category: Category;
  phoneId?: string;
  itemId: string;
  name: string;
  capacity: string;
  fullPrice: number;
  price: number;
  color: Color;
  image: string;
  screen: string;
  ram: string;
  year: number;
}
