import { ProductCategories } from './ProductCategories';
import { Colors } from './Color';

export interface Product {
  id: number;
  category: ProductCategories;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: Colors;
  ram: string;
  year: number;
  image: string;
  [key: string]: string | number | boolean;
}

export interface ProductCart extends Product {
  cartQty: number;
}
