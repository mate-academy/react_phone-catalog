import { Category } from './Categoty';

export interface Product {
  id: string,
  name: string,
  age: number,
  type: Category,
  imageUrl: string,
  snippet: string,
  price: number,
  discount: number,
  screen: string,
  capacity: string,
  ram: string,
}
