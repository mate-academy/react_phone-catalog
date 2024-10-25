export type Categories = 'phones' | 'accessories' | 'tablets';

export interface Product {
  id: number;
  category: Categories;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  ram: string;
  year: number;
  image: string;
}
