import { Category } from './Category';

export type Product = {
  id: string | number;
  category: Category;
  itemId: string;
  name: string;
  namespaceId: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
};
