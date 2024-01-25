import { Category } from './Category';

export interface Product {
  type: any;
  imageUrl: string | undefined;
  id: string;
  category: string;
  phoneId: string;
  itemId: string;
  name: string;
  fullPrice: number;
  item: Category;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
}
