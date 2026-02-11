import { Category } from './Category';

export interface Product {
  id: number;
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
}

export interface CartProduct {
  quantity: number;
  id: string;
  product: Product;
}
