import { ProductType } from './enums';

export interface Product {
  id: number;
  category: ProductType;
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
  counter: number;
}
