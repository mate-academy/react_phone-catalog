import { ProductCategories } from './ProductCategories';

export type Product = {
  id: number;
  category: ProductCategories;
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
  count?: number;
};
