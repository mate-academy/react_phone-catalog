import { Category } from "../enums/Api";

export type ProductId = string;

export interface Product {
  id: string,
  category: Category,
  phoneId?: string,
  itemId: ProductId,
  name: string,
  fullPrice: number,
  price: number,
  screen: string,
  capacity: string,
  color: string,
  ram: string,
  year: number,
  image: string,
}
