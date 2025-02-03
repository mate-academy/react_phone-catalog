import { ProductCategory } from './ProductCategory';

export interface Product {
  id: string;
  itemId: string;

  name: string;
  price: number;
  fullPrice: number;
  image: string;
  screen: string;
  capacity: string;
  ram: string;
  age: number;
  category: ProductCategory;
}
