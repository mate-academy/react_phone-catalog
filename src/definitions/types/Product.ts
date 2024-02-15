import { Category } from '../../api/products/server/types';

export type ProductId = string;

export interface Product {
  id: string,
  category: Category,
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

export interface CartProduct {
  id: ProductId,
  category: Category,
  name: string,
  price: number,
  image: string,
  amount: number,
}

export interface StorageProduct {
  id: ProductId,
  amount: number,
}
