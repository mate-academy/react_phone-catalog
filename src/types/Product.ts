import { Category } from './Category';

export interface Product {
  id: number;
  category: Category;
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

// using for control product amount in cart
// product has amount only when added in cart
export type ExtendedProduct = Product & {
  amount?: number;
};
